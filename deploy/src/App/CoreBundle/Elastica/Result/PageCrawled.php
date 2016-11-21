<?php

namespace App\CoreBundle\Elastica\Result;

use App\CoreBundle\Util\StringUtil;

class PageCrawled extends AbstractResult implements ResultInterface
{
    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'url' => $this->getUrl(),
            'path' => $this->getPath(),
            'title' => $this->getTitle(),
            'snippet' => $this->getSnippet()
        ];
    }

    /**
     * @return string
     */
    public function getSnippet()
    {
        return StringUtil::truncate($this->getContent(), 100);
    }
}