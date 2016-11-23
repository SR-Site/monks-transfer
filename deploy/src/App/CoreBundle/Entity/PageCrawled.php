<?php

namespace App\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="PageCrawledRepository")
 * @ORM\Table(name="pages_crawled", indexes={
 *      @ORM\Index(name="path", columns={"path"})
 * })
 */
class PageCrawled
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", unique=true)
     */
    protected $url;

    /**
     * @ORM\Column(type="string")
     */
    protected $path;

    /**
     * @ORM\Column(type="string")
     */
    protected $title;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    protected $metaKeywords;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $metaDescription;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    protected $metaTags;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    protected $headings;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $content;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $contentHtml;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    protected $styles;


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return CrawledPage
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     * @return CrawledPage
     */
    public function setUrl($url)
    {
        $this->url = $url;

        // create path based on url
        $urlData = parse_url($url);
        $path = '';
        if(!empty($urlData['path'])) {
            $path = $urlData['path'];
        }
        if(!empty($urlData['query'])) {
            $path .= '?' . $urlData['query'];
        }
        if(!empty($urlData['fragment'])) {
            $path .= '?' . $urlData['fragment'];
        }
        $this->setPath($path);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @param mixed $path
     * @return CrawledPage
     */
    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return CrawledPage
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMetaKeywords()
    {
        return $this->metaKeywords;
    }

    /**
     * @param mixed $metaKeywords
     * @return CrawledPage
     */
    public function setMetaKeywords($metaKeywords)
    {
        $this->metaKeywords = $metaKeywords;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMetaDescription()
    {
        return $this->metaDescription;
    }

    /**
     * @param mixed $metaDescription
     * @return CrawledPage
     */
    public function setMetaDescription($metaDescription)
    {
        $this->metaDescription = $metaDescription;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMeta()
    {
        return $this->meta;
    }

    /**
     * @param mixed $meta
     * @return CrawledPage
     */
    public function setMeta($meta)
    {
        $this->meta = $meta;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     * @return CrawledPage
     */
    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMetaTags()
    {
        return $this->metaTags;
    }

    /**
     * @param mixed $metaTags
     * @return CrawledPage
     */
    public function setMetaTags($metaTags)
    {
        $this->metaTags = $metaTags;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getHeadings()
    {
        return $this->headings;
    }

    /**
     * @param mixed $headings
     * @return CrawledPage
     */
    public function setHeadings($headings)
    {
        $this->headings = $headings;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContentHtml()
    {
        return $this->contentHtml;
    }

    /**
     * @param mixed $contentHtml
     * @return CrawledPage
     */
    public function setContentHtml($contentHtml)
    {
        $this->contentHtml = $contentHtml;
        return $this;
    }


    /**
     * @return mixed
     */
    public function getStyles()
    {
        return $this->styles;
    }

    /**
     * @param $styles
     * @return CrawledPage
     */
    public function setStyles($styles)
    {
        $this->styles = $styles;
        return $this;
    }


}

