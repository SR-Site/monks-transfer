<?php

namespace Drupal\mm_rest_search\Plugin;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\facets\Exception\Exception;
use Drupal\mm_rest\Plugin\ResourceBase as MMResourceBase;
use Drupal\search_api\Entity\Index;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;

use Drupal\facets\FacetManager\DefaultFacetManager;

use Drupal\mm_rest\Response\OffsetPaginatedResponse;

/**
 * Class ResourceSearch.
 *
 * @package Drupal\mm_rest_search\Plugin
 */
abstract class ResourceSearch extends MMResourceBase {

  /**
   * Default offset.
   */
  const OFFSET_DEFAULT = 0;

  /**
   * Default limit.
   */
  const LIMIT_DEFAULT = 10;

  /**
   * The default facet manager.
   *
   * @var \Drupal\facets\FacetManager\DefaultFacetManager
   */
  protected $facetsManager;

  /**
   * Returns the search results.
   *
   * @throws \Exception
   *
   * @TODO: refactor, separate into different protected functions.
   */
  public function get() {
    $results = [];
    $request = \Drupal::request();
    $index = $this->getIndex();

    if (empty($index)) {
      throw new Exception($this->t('There is no index defined'));
    }

    /* @var $search_api_index \Drupal\search_api\IndexInterface */
    $search_api_index = Index::load($index);

    if (empty($search_api_index)) {
      throw new Exception($this->t("Index '@index' does not exist.", ['@index' => $index]));
    }

    // Create the query.
    /** @var \Drupal\search_api\Query\QueryInterface $query */
    $query = $search_api_index->query([
      'limit' => $this->getLimit(),
      'offset' => !is_null($request->get('page')) ? $request->get('page') * $this->getLimit() : 0,
    ]);

    $search_id = "mm_rest:" . $this->getPluginId();

    $query->setSearchId($search_id);

    // Search for keys.
    $keys = $request->get('query');
    if (!empty($keys)) {
      $query->keys($keys);
    }

    // Pagination.
    $offset = $request->get('offset');
    $limit = $request->get('limit');

    $offset = (int) $offset ?: self::OFFSET_DEFAULT;
    $limit = (int) $limit ?: self::LIMIT_DEFAULT;

    $query->range($offset, $limit);

    $query->sort('created', 'DESC');

    // Get results.
    $result = $query->execute();
    $items = $result->getResultItems();

    foreach ($items as $item) {
      $entity = $item->getOriginalObject()->getValue();
      $results[] = $this->entityProcessor->getEntityData($entity, $this->getVersion(), ['view_mode' => $this->getViewMode()]);
    }

    // Processing facets.
    $facets = $this->facetsManager->getFacetsByFacetSourceId($search_id);
    $this->facetsManager->updateResults($search_id);

    $filters = [];
    foreach ($facets as $facet) {
      $filter = $this->facetsManager->build($facet);
      $filter = is_array($filter) ? reset($filter) : $filter;
      $filters = array_merge($filters, $filter);
    }

    $data = [
      'results' => $results,
      'filters' => $filters,
    ];

    $this->addCacheableDependency();

    return new OffsetPaginatedResponse($data, $offset, $limit, (int) $result->getResultCount());
  }

  /**
   * {@inheritdoc}
   */
  public function getViewMode() {
    $definition = $this->getPluginDefinition();
    return isset($definition['view_mode']) ? $definition['view_mode'] : 'default';
  }

  /**
   * {@inheritdoc}
   */
  public function getIndex() {
    $definition = $this->getPluginDefinition();
    return isset($definition['index_name']) ? $definition['index_name'] : NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getLimit() {
    $definition = $this->getPluginDefinition();
    return isset($definition['search_limit']) ? $definition['search_limit'] : 10;
  }

  /**
   * {@inheritdoc}
   *
   * Disable the cache.
   */
  protected function addCacheableDependency() {

    // If $this::requestData contains a content entity, the is no need to
    // override this method. The default will do.
    parent::addCacheableDependency();

    // If more cacheability meta data must be collected, use for example:
    // $this->cacheabilityCollector->addCacheableDependency($entity);

    // To disable caching, set the max age to 0 seconds.
    $meta_data = new CacheableMetadata();
    $meta_data->setCacheMaxAge(0);
    $this->cacheabilityCollector->addCacheableDependency($meta_data);
  }

  /**
   * ResourceSearch constructor.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The current request.
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   *   RestEntityProcessorManager.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   *   ConfigFactoryInterface.
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   *   CacheableMetaDataCollectorInterface.
   * @param \Drupal\facets\FacetManager\DefaultFacetManager $facet_manager
   *   DefaultFacetManager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, DefaultFacetManager $facet_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);
    $this->facetsManager = $facet_manager;
  }

  /**
   * {@inheritdoc}
   *
   * @TODO: check facets dependency.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('mm_rest'),
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('plugin.manager.mm_rest_entity_processor'),
      $container->get('config.factory'),
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('facets.manager')
    );
  }

}
