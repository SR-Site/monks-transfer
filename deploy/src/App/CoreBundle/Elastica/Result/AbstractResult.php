<?php

namespace App\CoreBundle\Elastica\Result;

use Elastica\Result;
use MediaMonks\CoreBundle\Interfaces\PublishableInterface;
use MediaMonks\CoreBundle\Util\StringUtil;

abstract class AbstractResult extends Result implements PublishableInterface
{
    /**
     * @var array
     */
    protected $data;

    /**
     * @param $name
     * @param $arguments
     * @return mixed
     */
    public function __call($name, $arguments)
    {
        $key = StringUtil::camelCaseToSnakeCase(substr($name, 3));
        return $this->getDataByKey($key);
    }

    /**
     * @param $key
     * @return mixed
     */
    public function getDataByKey($key)
    {
        if(empty($this->data)) {
            $this->data = $this->getData();
        }
        if(!isset($this->data[$key])) {
            return null;
        }
        return $this->data[$key];
    }

    /**
     * @return boolean
     */
    public function getEnabled()
    {
        return (bool) $this->getDataByKey('enabled');
    }

    public function setEnabled($enabled)
    {
        return;
    }

    public function setPublicationDateStart(\DateTime $publicationDateStart)
    {
        return;
    }

    /**
     * @return \DateTime|null
     */
    public function getPublicationDateStart()
    {
        return $this->getDataByKey('publication_date_start');
    }

    public function setPublicationDateEnd(\DateTime $publicationDateEnd)
    {
        return;
    }

    /**
     * @return \DateTime|null
     */
    public function getPublicationDateEnd()
    {
        return $this->getDataByKey('publication_date_end');
    }

    /**
     * @return array
     */
    public function getMediaFields()
    {
        return [];
    }
}