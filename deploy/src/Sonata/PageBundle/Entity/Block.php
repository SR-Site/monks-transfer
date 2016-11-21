<?php

namespace Application\Sonata\PageBundle\Entity;

use Sonata\PageBundle\Entity\BaseBlock as BaseBlock;

class Block extends BaseBlock
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