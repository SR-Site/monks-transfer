<?php

namespace App\CoreBundle\Elastica\Result;

/**
 * @author Nick Geleedst <nickg@mediamonks.com>
 */
class TabPage extends AbstractResult implements ResultInterface
{
    public function toArray()
    {
        return [
            'title' => $this->getTitle(),
            'slug' => $this->getSlug(),
            'description' => $this->getDescription(),
            'tabs' => $this->getTabs()
        ];
    }
}