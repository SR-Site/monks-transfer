<?php

namespace App\CoreBundle\Elastica\Repository;

use Elastica\Aggregation\DateRange;
use Elastica\Filter\BoolFilter;
use Elastica\Filter\Range;
use Elastica\Filter\Term;
use Elastica\Filter\GeoDistance;
use Elastica\Filter\Terms;
use Elastica\Query;
use Elastica\Aggregation\Terms as AgTerms;

class TagRepository extends AbstractRepository
{
    /**
     * @param array $slugs
     * @return Query
     */
    public function findTagsBySlugs(array $slugs)
    {
        $boolQuery = new Query\BoolQuery();
        $tagTerms = new Terms('slug', $slugs);
        $boolQuery->addFilter($tagTerms);

        return new Query($boolQuery);
    }
}