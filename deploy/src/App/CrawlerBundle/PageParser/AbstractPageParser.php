<?php

namespace App\CrawlerBundle\PageParser;

use Symfony\Component\DomCrawler\Crawler;

abstract class AbstractPageParser implements PageParserInterface
{
    /**
     * @var Crawler
     */
    protected $crawler;

    /**
     * @param Crawler $crawler
     * @return $this
     */
    public function setCrawler(Crawler $crawler)
    {
        $this->crawler = $crawler;
        return $this;
    }

    /**
     * @return array
     */
    public function getLinks()
    {
        return $this->crawler->filter('a')->each( function ( Crawler $node, $i ) {
            return $node->link()->getUri();
        });
    }
}