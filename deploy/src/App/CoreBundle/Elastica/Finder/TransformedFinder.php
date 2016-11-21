<?php

namespace App\CoreBundle\Elastica\Finder;

use Elastica\ResultSet;
use Elastica\Query;
use FOS\ElasticaBundle\Finder\TransformedFinder as BaseTransformedFinder;

class TransformedFinder extends BaseTransformedFinder
{
    /**
     * Search for a query string.
     *
     * @param string  $query
     * @param integer $limit
     * @param array   $options
     *
     * @return array of model objects
     **/
    public function find($query, $limit = null, $options = array())
    {
        $resultSet = $this->search($query, $limit, $options);
        foreach($this->transformer->transform($resultSet->getResults()) as $k => $result) {
            $resultSet->offsetSet($k, $result);
        }
        return $resultSet;
    }

    public function findHybrid($query, $limit = null, $options = array())
    {
        $resultSet = $this->search($query, $limit, $options);
        foreach($this->transformer->hybridTransform($resultSet->getResults()) as $k => $result) {
            $resultSet->offsetSet($k, $result);
        }
        return $resultSet;
    }

    /**
     * @param $query
     * @param null|int $limit
     * @param array    $options
     *
     * @return ResultSet
     */
    protected function search($query, $limit = null, $options = array())
    {
        $queryObject = Query::create($query);
        if (null !== $limit) {
            $queryObject->setSize($limit);
        }

        return $this->searchable->search($queryObject, $options);
    }
}