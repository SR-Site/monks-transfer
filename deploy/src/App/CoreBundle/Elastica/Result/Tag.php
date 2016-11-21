<?php

namespace App\CoreBundle\Elastica\Result;

class Tag extends AbstractResult implements ResultInterface
{
    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'slug'  => $this->getSlug(),
            'title' => $this->getName()
        ];
    }
}