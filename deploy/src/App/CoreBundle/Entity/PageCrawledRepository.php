<?php

namespace App\CoreBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PageCrawledRepository extends EntityRepository
{
    /**
     * @param \DateTime $dateTime
     * @return \Doctrine\ORM\Query
     */
    public function removeOutdated(\DateTime $dateTime)
    {
        return $this->_em->createQueryBuilder()
            ->delete()
            ->from('MediaMonksCoreBundle:PageCrawled', 'pc')
            ->where('pc.updatedAt <= :updatedAt')
            ->setParameter('updatedAt', $dateTime)
            ->getQuery()
        ;
    }
}