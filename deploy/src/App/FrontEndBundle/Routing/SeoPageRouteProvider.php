<?php

namespace App\FrontEndBundle\Routing;

use Elastica\Result;
use FOS\ElasticaBundle\Finder\TransformedFinder;
use Doctrine\ORM\EntityManager;
use Elastica\Filter\Term;
use Elastica\Query\BoolQuery;
use App\CoreBundle\Elastica\Repository\AbstractRepository;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Cmf\Component\Routing\RouteProviderInterface;

class SeoPageRouteProvider implements RouteProviderInterface
{
    /**
     * @var AbstractRepository
     */
    protected $pageRepository;

    /**
     * @var TransformedFinder
     */
    protected $pageFinder;

    /**
     * @var AbstractRepository
     */
    protected $pageCrawledRepository;

    /**
     * @var TransformedFinder
     */
    protected $pageCrawledFinder;

    /**
     * @var array
     */
    protected $ignores = [
        '^/api'
    ];

    /**
     * SeoPageRouteProvider constructor.
     * @param AbstractRepository $pageRepository
     * @param TransformedFinder $pageFinder
     * @param AbstractRepository $pageCrawledRepository
     * @param TransformedFinder $pageCrawledFinder
     */
    public function __construct(
        AbstractRepository $pageRepository,
        TransformedFinder $pageFinder,
        AbstractRepository $pageCrawledRepository,
        TransformedFinder $pageCrawledFinder
    ) {
        $this->pageRepository        = $pageRepository;
        $this->pageFinder            = $pageFinder;
        $this->pageCrawledRepository = $pageCrawledRepository;
        $this->pageCrawledFinder     = $pageCrawledFinder;
    }

    /**
     * {@inheritDoc}
     */
    public function getRouteCollectionForRequest(Request $request)
    {
        $collection = new RouteCollection();

        if (empty(ltrim($request->getPathInfo(), '/'))) {
            return $collection;
        }

        foreach ($this->ignores as $ignore) {
            if (preg_match('~' . $ignore . '~', $request->getPathInfo())) {
                return $collection;
            }
        }

        $page = $this->getResult($this->pageRepository, $this->pageFinder, $request->getPathInfo(), 'url');
        $pageCrawled = $this->getResult($this->pageCrawledRepository, $this->pageCrawledFinder,  $request->getPathInfo(), 'path');

        if (empty($page) && empty($pageCrawled)) {
            $collection->add('front_end_not_found_' . md5($request->getPathInfo()), new Route(
                $request->getPathInfo(),
                [
                    '_controller' => 'AppFrontEndBundle:Error:notFound',
                ]
            ));
        } else {
            $collection->add('front_end_seo_page_' . md5($request->getPathInfo()), new Route(
                $request->getPathInfo(),
                [
                    '_controller' => 'AppFrontEndBundle:SeoPage:index',
                    'page'        => $page,
                    'pageCrawled' => $pageCrawled
                ]
            ));
        }

        return $collection;
    }

    /**
     * @param AbstractRepository $repository
     * @param TransformedFinder $finder
     * @param $value
     * @param $term
     * @return Result|null
     */
    protected function getResult(AbstractRepository $repository, TransformedFinder $finder, $value, $term)
    {
        try {
            $resultSet = $finder->find($repository->findOne($value, $term));
            if($resultSet->getTotalHits() > 0) {
                return $resultSet[0];
            }
        } catch (\Exception $e) {
            // ignore errors from elasticsearch
        }
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public function getRouteByName($name)
    {
        throw new RouteNotFoundException(sprintf('Route "%s" is not handled by this route provider', $name));
    }

    /**
     * {@inheritDoc}
     */
    public function getRoutesByNames($names = null)
    {
        return [];
    }
}