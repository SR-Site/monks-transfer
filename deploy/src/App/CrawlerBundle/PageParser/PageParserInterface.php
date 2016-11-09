<?php

namespace App\CrawlerBundle\PageParser;

use Symfony\Component\DomCrawler\Crawler;

interface PageParserInterface
{
    public function setCrawler(Crawler $crawler);

    public function getLinks();
}