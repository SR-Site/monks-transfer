<?php

namespace App\CrawlerBundle\Command;

use Doctrine\ORM\EntityManager;
use Goutte\Client;
use App\CoreBundle\Entity\PageCrawled;
use App\CrawlerBundle\Crawler\Crawler;
use App\CrawlerBundle\PageParser\PageParser;
use Monolog\Handler\StreamHandler;
use Symfony\Bridge\Monolog\Logger;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CrawlUrlCommand extends ContainerAwareCommand
{
    const ARGUMENT_URL = 'url';
    const OPTION_LIMIT = 'limit';

    protected function configure()
    {
        $this
            ->setName('crawler:crawl-url')
            ->setDescription('Crawl a url')
            ->addArgument(
                self::ARGUMENT_URL,
                InputArgument::REQUIRED,
                'Url of the page you want to crawl'
            )
            ->addOption(
                self::OPTION_LIMIT,
                null,
                InputOption::VALUE_OPTIONAL,
                'Limit number of pages to crawl'
            );
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /**
         * @var EntityManager $entityManager
         */
        $entityManager = $this->getContainer()->get('doctrine.orm.entity_manager');

        $logger = new Logger('crawler', [
            new StreamHandler('php://output')
        ]);

        // @todo move ignoreList to here
        // @todo move html purifier to crawler class
        // @todo create services in this bundle
        // @todo configure logger
        // @todo set callback to a class/method
        // @todo optimize memory usage

        $options = [
            'logger' => $logger,
            'blackList' => [
                '~^sitemap~',
                '~^account~',
                '~^search~',
                '~^profile~'
            ]
        ];
        if ($input->getOption(self::OPTION_LIMIT)) {
            $options['limit'] = (int)$input->getOption(self::OPTION_LIMIT);
        }

        $crawler = new Crawler(
            $this->getContainer()->get($this->getContainer()->getParameter('crawler_client')),
            new PageParser(),
            $input->getArgument(self::ARGUMENT_URL),
            $options
        );


        $i = 0;
        $crawler->setCallback(function ($url, $parser, $domCrawler, $response) use ($entityManager, &$i, $output) {

            /**
             * @var PageParser $parser
             * @var \GuzzleHttp\Client $client
             */
            $page = $entityManager->getRepository('AppCoreBundle:PageCrawled')->findOneByUrl($url);
            if (empty($page)) {
                $page = new PageCrawled();
                $page->setUrl($url);
            }


            try {
                $page->setTitle($parser->getTitle());
                $page->setMetaDescription($parser->getMetaDescription());
                $page->setMetaKeywords($parser->getMetaKeywords());
                $page->setHeadings($parser->getHeadings(range(1, 3)));
                $page->setMetaTags($parser->getMetaTags());
                $page->setContent($parser->getContent());

                /*$html = preg_replace('/\s+/', ' ', $this->getContainer()
                    ->get('exercise_html_purifier.crawler')->purify($parser->getContentHtml())
                );*/

                $html = $this->getContainer()
                    ->get('exercise_html_purifier.crawler')->purify($parser->getContentHtml()
                    );

                $html = trim(str_replace(["\t", "\n", "\r"], ['', '', ''], $html));

                $page->setContentHtml($html);

                $entityManager->persist($page);
                $entityManager->flush();
            } catch (\Exception $e) {
                echo 'Error saving page: ' . $e->getMessage() . PHP_EOL;
                return;
            }

            $output->writeln(sprintf('%d - %s (status code: %d, memory_usage: %s',
                ++$i,
                $url,
                $response->getStatus(),
                $this->convert(memory_get_usage())
            ));
        });
        $crawler->start();

        $output->writeln(sprintf('Total pages: %d', count($crawler->getPages())));
    }

    /**
     * @param $size
     * @return string
     */
    protected function convert($size)
    {
        $unit = ['b', 'kb', 'mb', 'gb', 'tb', 'pb'];
        return @round($size / pow(1024, ($i = floor(log($size, 1024)))), 2) . ' ' . $unit[$i];
    }
}