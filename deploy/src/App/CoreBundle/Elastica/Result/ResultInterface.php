<?php

namespace App\CoreBundle\Elastica\Result;

interface ResultInterface
{
    public function toArray();

    public function getMediaFields();
}