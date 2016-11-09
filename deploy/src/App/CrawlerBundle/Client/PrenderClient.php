<?php

namespace App\CrawlerBundle\Client;

use Goutte\Client as BaseClient;
use Symfony\Component\BrowserKit\History;
use Symfony\Component\BrowserKit\CookieJar;

class PrenderClient extends BaseClient
{
    /**
     * @var string
     */
    protected $prenderUrl;

    /**
     * Constructor.
     *
     * @param string    $prenderUrl The url of the prender server
     * @param array     $server    The server parameters (equivalent of $_SERVER)
     * @param History   $history   A History instance to store the browser history
     * @param CookieJar $cookieJar A CookieJar instance to store the cookies
     */
    public function __construct($prenderUrl, array $server = array(), History $history = null, CookieJar $cookieJar = null)
    {
        $this->prenderUrl = $prenderUrl;
        parent::__construct($server, $history, $cookieJar);
    }

    /**
     * @inheritdoc
     */
    public function request($method, $uri, array $parameters = [], array $files = [], array $server = [], $content = null, $changeHistory = true)
    {
        $uri = $this->prenderUrl . $uri;
        return parent::request($method, $uri, $parameters, $files, $server, $content, $changeHistory);
    }
}