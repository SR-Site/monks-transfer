<?php

namespace Application\Sonata\PageBundle\Entity;

use Sonata\PageBundle\Entity\PageManager as BaseEntityManager;

class PageManager extends BaseEntityManager
{
    public function count()
    {
        $query = $this->getEntityManager()->createQuery('SELECT count(p.id) FROM Application\Sonata\PageBundle\Entity\Page p');
        $query->useResultCache(true, 3600);
        return $query->getSingleScalarResult();
    }
}
