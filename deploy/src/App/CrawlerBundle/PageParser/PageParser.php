<?php

namespace App\CrawlerBundle\PageParser;

use Symfony\Component\DomCrawler\Crawler;

class PageParser extends AbstractPageParser
{

    /**
     * @return string
     */
    public function getTitle()
    {
        if( $this->crawler->filterXpath('//title')->count() )
        {
            return trim($this->crawler->filterXpath('//title')->text());
        }
        return 'no-data';
    }

    /**
     * @return string
     */
    public function getMetaDescription()
    {
        if( $this->crawler->filterXPath('html/head/meta[@name="description"]')->count() )
        {
            return trim($this->crawler->filterXPath('html/head/meta[@name="description"]')->attr('content'));
        }
        return 'no-data';
    }

    /**
     * @return string
     */
    public function getMetaKeywords()
    {
        $keywords = [];
        foreach(explode(',', $this->crawler->filterXPath('html/head/meta[@name="keywords"]')->attr('content')) as $v) {
            $keyword = trim($v);
            if(!empty($keyword)) {
                $keywords[] = $keyword;
            }
        }
        return $keywords;
    }

    /**
     * @param int|array $size
     * @return array
     */
    public function getHeadings($size)
    {
        if(is_array($size)) {
            $headings = [];
            foreach($size as $i) {
                $headings[$i] = [];
                foreach($this->getHeadings($i) as $heading) {
                    $headings[$i][] = $heading;
                }
            }
            return $headings;
        }

        $headings = [];
        $this->crawler->filter('h' . $size)->each(function (Crawler $node, $i) use(&$headings) {
            $headings[] = trim($node->text());
        });
        return $headings;
    }

    /**
     * @return array
     */
    public function getParagraphs()
    {
        return $this->crawler->filter('p')->each( function ( Crawler $node, $i ) {
            return trim($node->text());
        });
    }

    /**
     * @return string
     */
    public function getContentHtml()
    {
        if($this->crawler->filter('div.view-index main')->count() === 1) {
            return $this->crawler->filter('div.view-index main')->html();
        }
    }

    /**
     * @return string
     */
    public function getContent()
    {
        $content = '';
        if($this->crawler->filter('div.view-index main')->count() === 1) {
            $content = $this->crawler->filter('div.view-index main')->text();
        }
        return $this->cleanString($content);
    }

    /**
     * @param $value
     * @return mixed
     */
    protected function cleanString($value)
    {
        $cleaned = [];
        foreach(explode("\n", $value) as $line) {
            $line = trim($line);
            if(empty($line)) {
                continue;
            }
            $cleaned[] = $line;
        }
        return implode("\n", $cleaned);
    }

    /**
     * @return array
     */
    public function getMetaTags()
    {
        $metaTags = [];
        foreach($this->crawler->filter('head > meta') as $node) {
            $data = [];
            foreach ($node->attributes as $attr) {
                $name = $attr->nodeName;
                $value = $attr->nodeValue;
                $data[$name] = $value;
            }
            $metaTags[] = $data;
        }
        return $metaTags;
    }
}