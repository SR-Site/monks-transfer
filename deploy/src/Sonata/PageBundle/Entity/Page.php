<?php

namespace Application\Sonata\PageBundle\Entity;

use Sonata\PageBundle\Entity\BasePage as BasePage;

class Page extends BasePage
{
    /**
     * @var integer $id
     */
    protected $id;

    /**
     * Get id
     *
     * @return integer $id
     */
    public function getId()
    {
        return $this->id;
    }
}