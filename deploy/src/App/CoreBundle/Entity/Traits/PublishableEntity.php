<?php
namespace App\CoreBundle\Entity\Traits;

use Doctrine\Orm\Mapping as ORM;

/**
 * @author Nick Geleedst <nickg@mediamonks.com>
 */
trait PublishableEntity
{
    /**
     * @ORM\Column(type="boolean")
     */
    protected $published = false;

    /**
     * @return mixed
     */
    public function getPublished()
    {
        return $this->published;
    }

    /**
     * @param mixed $published
     * @return PublishableEntity
     */
    public function setPublished($published)
    {
        $this->published = $published;

        return $this;
    }
}