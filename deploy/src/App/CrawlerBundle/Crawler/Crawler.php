<?php

namespace App\CrawlerBundle\Crawler;

use Goutte\Client;
use GuzzleHttp\Exception as GuzzleException;
use App\CrawlerBundle\PageParser\AbstractPageParser;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;
use Psr\Log\NullLogger;
use Symfony\Component\DomCrawler\Crawler as DomCrawler;
use Symfony\Component\HttpFoundation\Request;

class Crawler implements LoggerAwareInterface
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @var AbstractPageParser
     */
    protected $parser;

    /**
     * @var string
     */
    protected $baseUrl;

    /**
     * @var \Closure
     */
    protected $callback;

    /**
     * @var array
     */
    protected $pages = [];

    /**
     * @var array
     */
    protected $urls = [];

    /**
     * @var int
     */
    protected $limit = false;

    /**
     * @var array
     */
    protected $whiteList = [];

    /**
     * @var array
     */
    protected $blackList = [];

    /**
     * @var array
     */
    protected $ignoreList = [
        '~^javascript~',
        '~^#.*~',
        '~^_profiler~',
        '~^version/~',
    ];

    /**
     * @var LoggerInterface
     */
    protected $logger = null;

    /**
     * @param Client $client
     * @param AbstractPageParser $parser
     * @param string $baseUrl
     * @param array $options
     */
    public function __construct(Client $client, AbstractPageParser $parser, $baseUrl, array $options = [])
    {
        $this->client = $client;
        $this->parser = $parser;

        if (strpos($baseUrl, 'http') === false) {
            $baseUrl = 'http://' . $baseUrl;
        }
        $this->baseUrl = $baseUrl;
        $this->setOptions($options);
    }

    /**
     * @param array $options
     */
    public function setOptions(array $options)
    {
        if (isset($options['limit'])) {
            $this->setLimit($options['limit']);
        }
        if (isset($options['blackList'])) {
            $this->setBlackList($options['blackList']);
        }
        if (isset($options['whiteList'])) {
            $this->setWhiteList($options['whiteList']);
        }
        if (isset($options['logger'])) {
            $this->setLogger($options['logger']);
        }
    }

    /**
     * @return int
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @param int $limit
     * @return $this
     */
    public function setLimit($limit)
    {
        $this->limit = $limit;
        return $this;
    }

    /**
     * @return array
     */
    public function getWhiteList()
    {
        return $this->whiteList;
    }

    /**
     * @param array $whiteList
     * @return $this
     */
    public function setWhiteList($whiteList)
    {
        $this->whiteList = $whiteList;
        return $this;
    }

    /**
     * @return array
     */
    public function getBlackList()
    {
        return $this->blackList;
    }

    /**
     * @param array $blackList
     * @return $this
     */
    public function setBlackList($blackList)
    {
        $this->blackList = $blackList;
        return $this;
    }

    /**
     * @return LoggerInterface
     */
    public function getLogger()
    {
        if (is_null($this->logger)) {
            $this->logger = new NullLogger();
        }
        return $this->logger;
    }

    /**
     * @param LoggerInterface $logger
     * @return $this
     */
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
        return $this;
    }

    /**
     * @param \Closure $callback
     * @return $this
     */
    public function setCallback(\Closure $callback)
    {
        $this->callback = $callback;
        return $this;
    }

    /**
     *
     */
    public function start()
    {
        $this->crawl($this->baseUrl);
    }

    /**
     * @return array
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * @param $url
     * @return bool|void
     */
    protected function crawl($url)
    {
        if ($this->limit !== false && count($this->pages) === $this->limit) {
            return; // stop if we reach limit
        }

        try {
            $crawler = $this->requestPage($url);
            $this->getLogger()->debug(sprintf('Crawled page %s', $url));
        } catch (\Exception $e) {
            $this->getLogger()->error(sprintf('Error requesting page %s: %s', $url, $e->getMessage()));
            return;
        }

        $this->pages[$url] = $crawler;
        $this->parser->setCrawler($crawler);
        $this->addLinksToQueue($this->parser->getLinks());

        if($this->shouldStoreUrl($url)) {
            if (isset($this->callback)) {
                $this->getLogger()->debug(sprintf('Calling callback for url "%s"', $url));
                call_user_func_array($this->callback, [$url, $this->parser, $crawler, $this->client->getResponse()]);
            }
        }

        if (count($this->urls) > 0) {
            $this->crawl(array_shift($this->urls));
        }
    }

    /**
     * @param $url
     * @return bool
     */
    protected function shouldStoreUrl($url)
    {
        $relativePath = $this->getRelativePath($url);
        if($relativePath === false) {
            return false;
        }

        if (!empty($this->whiteList)) {
            foreach ($this->whiteList as $pattern) {
                if (preg_match($pattern, $relativePath)) {
                    return true;
                }
            }
            $this->getLogger()->info(sprintf('Skipped "%s" because it is not in the white list', $url));
            return false;
        }

        foreach ($this->blackList as $pattern) {
            if (preg_match($pattern, $relativePath)) {
                $this->getLogger()->info(
                    sprintf('Skipped "%s" because it matched black list pattern "%s"', $url, $pattern)
                );
                return false;
            }
        }

        return true;
    }

    /**
     * @param $urls
     */
    protected function addLinksToQueue($urls)
    {
        foreach ($urls as $url) {
            if ($this->isValidUrl($url) && !in_array($url, $this->urls)) {
                $this->getLogger()->debug(sprintf('Adding url "%s" to queue', $url));
                $this->urls[] = $url;
            }
        }
    }

    /**
     * @return array
     */
    public function getQueuesUrls()
    {
        return $this->urls;
    }

    /**
     * @return array
     */
    public function getCrawledUrls()
    {
        return array_keys($this->pages);
    }

    /**
     * @param $url
     * @return DomCrawler
     */
    protected function requestPage($url)
    {
        return $this->client->request(Request::METHOD_GET, $url);
    }

    /**
     * @param $url
     * @return bool
     */
    protected function isValidUrl($url)
    {
        if (empty($url)) {
            return false;
        }

        $url = $this->sanatizeUrl($url);

        if (isset($this->pages[$url]) || in_array($url, $this->urls)) {
            return false; // prevent scraping the same url multiple times
        }

        $urlTrimmed     = $this->stripProtocolFromUrl($url);
        $baseUrlTrimmed = $this->stripProtocolFromUrl($this->baseUrl);
        if (strpos($urlTrimmed, $baseUrlTrimmed) === false) {
            return false;
        }

        $relativePath = $this->getRelativePath($url);
        if($relativePath === false) {
            return false;
        }

        foreach ($this->ignoreList as $pattern) {
            if (preg_match($pattern, $relativePath)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param $url
     * @return bool|mixed
     */
    protected function getRelativePath($url)
    {
        $urlTrimmed     = $this->stripProtocolFromUrl($url);
        $baseUrlTrimmed = $this->stripProtocolFromUrl($this->baseUrl);
        if (strpos($urlTrimmed, $baseUrlTrimmed) === false) {
            return false;
        }
        return str_replace($baseUrlTrimmed, '', $urlTrimmed);
    }

    /**
     * @param string $value
     * @return string
     */
    protected function stripProtocolFromUrl($value)
    {
        return str_replace(['http://', 'https://'], '', $value);
    }

    /**
     * @param $value
     * @return string
     */
    protected function sanatizeUrl($value)
    {
        $parsed   = parse_url($value);
        $scheme   = isset($parsed['scheme']) ? $parsed['scheme'] . '://' : '';
        $host     = isset($parsed['host']) ? $parsed['host'] : '';
        $port     = isset($parsed['port']) ? ':' . $parsed['port'] : '';
        $path     = isset($parsed['path']) ? $parsed['path'] : '';
        $query    = isset($parsed['query']) ? '?' . $parsed['query'] : '';

        return $scheme . $host . $port . $path . $query;
    }
}