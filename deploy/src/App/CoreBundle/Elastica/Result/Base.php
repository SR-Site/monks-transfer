<?php

namespace App\CoreBundle\Elastica\Result;

class Base extends AbstractResult implements ResultInterface
{
    public function toArray()
    {
        return [
            'slug'      => $this->getSlug(),
            'name'      => $this->getName(),
            'city'      => $this->getCity(),
            'state'     => $this->getState(),
            'region'    => $this->getRegion(),
            'telephone' => $this->getTelephone(),
            'url'       => $this->getUrl(),
            'x-axis'    => (float)$this->getXAxis(),
            'y-axis'    => (float)$this->getYAxis()
        ];
    }
}