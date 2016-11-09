<?php

namespace App\CrawlerBundle\Command;

use Doctrine\ORM\EntityManager;
use Goutte\Client;
use App\CoreBundle\Entity\PageCrawled;
use App\CrawlerBundle\Client\PrenderClient;
use App\CrawlerBundle\Client\PrenderIoClient;
use App\CrawlerBundle\Crawler\Crawler;
use App\CrawlerBundle\PageParser\PageParser;
use Monolog\Handler\StreamHandler;
use Symfony\Bridge\Monolog\Logger;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class RemoveOutdatedCommand extends ContainerAwareCommand
{
    const ARGUMENT_TIME = 'time';

    protected function configure()
    {
        $this
            ->setName('crawler:remove-outdated')
            ->setDescription('Remove pages based on how long they are not updated')
            ->addArgument(
                self::ARGUMENT_TIME,
                InputArgument::OPTIONAL,
                'Last updated',
                '-3 days'
            )
        ;
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

        $date = new \DateTime;
        $date->modify($input->getArgument(self::ARGUMENT_TIME));

        $output->writeln(sprintf('Using date "%s"', $date->format('Y-m-d H:i:s')));

        $affected = $entityManager->getRepository('AppCoreBundle:PageCrawled')->removeOutdated($date)->execute();

        $output->writeln(sprintf('Removed %d page(s)"', $affected));
    }
}