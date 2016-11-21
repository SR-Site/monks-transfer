<?php

namespace Application\Sonata\PageBundle\Entity;

use MediaMonks\CoreBundle\Entity\ContentEntityInterface;
use Sonata\PageBundle\Entity\BaseSnapshot as BaseSnapshot;
use Doctrine\ORM\Mapping as ORM;

class Snapshot extends BaseSnapshot implements ContentEntityInterface
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

    public function getEdited()
    {
        return $this->getPage()->getEdited();
    }

    public function setEdited($edited)
    {
        $this->getPage()->setEdited($edited);
    }

    /**
     * @return bool
     */
    public function getEnabled()
    {
        return true;
    }

    public function getContentFlat()
    {
        return json_encode($this->getContent());
    }

    /**
     * @return string
     */
    public function getElasticsearchTypeName()
    {
        return 'page';
    }
}