<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\State\StateInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\ResourceBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_slug\PathProcessorSlug;
use Drupal\mm_slug\SlugResolverInterface;
use Drupal\spectrum_rest\Exception\NotFoundHttpException;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a resource to get Page node data.
 *
 * @RestResource(
 *   id = "spectrum_rest_page_v1",
 *   version = "v1",
 *   entity_type = "node",
 *   entity_bundle = "page",
 *   label = @Translation("Spectrum rest Page resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/page/{slug}"
 *   }
 * )
 */
class PageResource extends ResourceBase {

  /**
   * Slug Resolver service
   *
   * @var \Drupal\mm_slug\SlugResolverInterface
   */
  protected $slugResolver;

  /**
   * Slug Path Processor service.
   *
   * @var \Drupal\mm_slug\PathProcessorSlug
   */
  protected $slugPathProcessor;

  /**
   * Entity manager which performs the upcasting in the end.
   *
   * @var \Drupal\Core\Entity\EntityRepositoryInterface
   */
  protected $entityRepository;

  /**
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Responds to entity GET requests with parameter.
   *
   * @param string $slug
   * @return array
   */
  public function get($slug) {

    $slug = $this->slugPathProcessor->resolveSlug($this->request, $slug);

    // Try to load the entity based on the slug.
    /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
    $entity = $this->slugResolver->loadEntityBySlug($slug);

    if (empty($entity)) {
      // @TODO: improve this, implement something like \Drupal\Core\EventSubscriber\ExceptionJsonSubscriber
      if ($notFound = $this->state->get('site_404')) {
        $this->disableCache();

        list(, $nid) = explode('/', $notFound);
        /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
        $entity = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
      }
    }

    if (empty($entity)) {
      // Throw our own NotFoundHttpException, which implements
      // ExceptionInterface to avoid cache.
      throw new NotFoundHttpException($this->t('Not found'));
    }

    $this->requestData = $entity;

    $this->validateRequest();
    $this->validateAccess();

    $this->addCacheableDependency();

    return $this->responseData();
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {
    // Get the Default View of the Article Node using a Rest EntityProcessor
    // plugin that matches the entity type and bundle. For an article the
    // Drupal\mm_rest_example\Plugin\RestEntityProcessor\NodeArticleV1 will be
    // used.
    return $this->getEntityData($this->requestData);
  }

  /**
   * mm_slug replace {slug} for 'slugfound' in the path,  so when the request
   * get cached by dynamic_page_cache all pages return the same content.
   * Adding the query param slugfound (which is created by mm_slug) solves
   * the issue.
   *
   * @TODO: solve this issue in mm_slug.
   * @see \Drupal\mm_slug\PathProcessorSlug::processInbound()
   */
  protected function addCacheableDependency() {
    parent::addCacheableDependency();

    /** @var \Drupal\Core\Cache\CacheableMetadata $meta_data */
    $metadata = new CacheableMetadata();
    $metadata->setCacheContexts(['url.query_args:slugfound']);
    $this->cacheabilityCollector->addCacheableDependency($metadata);
  }

  /**
   * Disable cache.
   */
  protected function disableCache() {
    /** @var \Drupal\Core\Cache\CacheableMetadata $meta_data */
    $metadata = new CacheableMetadata();
    $metadata->setCacheMaxAge(0);
    $this->cacheabilityCollector->addCacheableDependency($metadata);
  }

  /**
   * @inheritDoc
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, SlugResolverInterface $slug_resolver, PathProcessorSlug $slug_path_processor, EntityRepositoryInterface $entity_repository, StateInterface $state) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);
    $this->slugResolver = $slug_resolver;
    $this->slugPathProcessor = $slug_path_processor;
    $this->entityRepository = $entity_repository;
    $this->state = $state;
  }

  /**
   * @inheritDoc
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
      $container->get('mm_slug.slug_resolver'),
      $container->get('mm_slug.path_processor'),
      $container->get('entity.repository'),
      $container->get('state')
    );
  }

}
