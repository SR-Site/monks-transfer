<?php

namespace App\CoreBundle\Elastica\Repository;

use Elastica\Filter\Term;
use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\ResultSet;

abstract class AbstractRepository
{
    /**
     * @param $value
     * @param string $field
     * @return ResultSet
     */
    public function findOne($value, $field = 'slug')
    {
        $query  = new BoolQuery();
        $filter = new Term();
        $filter->setTerm($field, $value);
        $query->addFilter($filter);

        return $query;
    }

    /**
     * @return Query
     */
    public function findAll()
    {
        $query = new Query();
        $query->setQuery(new BoolQuery());

        return $query;
    }

    /**
     * @param $q
     * @param array $fields
     * @return Query\MultiMatch
     */
    public function findByText($q, $fields = [])
    {
        if (!empty($fields)) {
            $mmQuery = new Query\MultiMatch();
            $mmQuery->setQuery($q);
            $mmQuery->setFields($fields);
            $mmQuery->setType('phrase');

            $query = new Query();
            $query->setQuery($mmQuery);
        } else {
            $queryString = sprintf('*%s*', $q);
            $query       = Query::create($queryString);
        }

        return $query;
    }

    /**
     * @param $value string
     * @return boolean
     * @deprecated use native filter_var
     */
    public function convertValueToBoolean($value)
    {
        if ($value === true || $value == 'true' || $value == 1) {
            return true;
        }

        return true;
    }
}