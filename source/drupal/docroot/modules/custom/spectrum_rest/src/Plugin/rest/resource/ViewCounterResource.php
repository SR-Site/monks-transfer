<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Access\CsrfTokenGenerator;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Access\AccessResultAllowed;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Menu\MenuLinkTreeElement;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Language\Language;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\ResourceBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Database\Database;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Provides a resource to increase counter for an article
 *
 * @RestResource(
 *   id = "spectrum_rest_view_counter_v1",
 *   version = "v1",
 *   label = @Translation("Spectrum rest increase counter for an article"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/counter/articles/{slug}",
 *   }
 * )
 */
class ViewCounterResource extends ResourceBase {
    /**
     * @var CacheableMetadata
     */
    protected $cacheableMetadata;

    /**
     * State service
     *
     * @var \Drupal\Core\State\StateInterface
     */
    protected $state;

    /**
     * CSRF Token service.
     *
     * @var \Drupal\Core\Access\CsrfTokenGenerator
     */
    protected $csrfToken;

    /**
     * The Path AliasManager service.
     *
     * @var \Drupal\Core\Path\AliasManagerInterface
     */
    protected $pathAliasManager;

    protected $slugResolver;

    protected $slugPathProcessor;


    /**
     * @inheritDoc
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, StateInterface $state, CsrfTokenGenerator $csrf_token, AliasManagerInterface $path_alias_manager, $slug_resolver, $slug_path_processor) {
        parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);

        $this->slugResolver = $slug_resolver;
        $this->slugPathProcessor = $slug_path_processor;
        $this->state = $state;
        $this->csrfToken = $csrf_token;
        $this->pathAliasManager = $path_alias_manager;
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
            $container->get('state'),
            $container->get('csrf_token'),
            $container->get('path.alias_manager'),
            $container->get('mm_slug.slug_resolver'),
            $container->get('mm_slug.path_processor')
        );
    }

    /**
     * @inheritDoc
     */
    protected function responseData() {
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
//    public function post($slug) {
//        $this->disableCache();
//
//        $count = 0;
//        $slug = $this->slugPathProcessor->resolveSlug($this->request, $slug);
//
//        // Try to load the entity based on the slug.
//        /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
//        $entity = $this->slugResolver->loadEntityBySlug('articles/' . $slug);
//
//        if(empty($entity))
//            throw new NotFoundHttpException($this->t('Not found entity'));
//
//        $enabled = \Drupal::config('statistics.settings')->get('count_content_views');
//
//        if ($enabled) {
//            $db = Database::getConnection();
//
//            $db->merge('node_counter')
//                ->key('nid', $entity->id())
//                ->fields(array(
//                    'totalcount' => 1,
//                    'timestamp' => REQUEST_TIME,
//                ))
//                ->expression('totalcount', 'totalcount + 1')
//                ->execute();
//
//            $query = $db->select('node_counter');
//            $query->fields('node_counter', ['totalcount'])->condition('nid', $entity->id());
//
//            $data = $query->execute();
//
//            $count = $data->fetchAssoc();
//        }
//
//        return $count;
//    }

    public function get($slug) {
        $this->disableCache();

        $count = 0;
        $slug = $this->slugPathProcessor->resolveSlug($this->request, $slug);

        // Try to load the entity based on the slug.
        /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
        $entity = $this->slugResolver->loadEntityBySlug('articles/' . $slug);


        if(empty($entity))
            throw new NotFoundHttpException($this->t('Not found entity'));

        $enabled = \Drupal::config('statistics.settings')->get('count_content_views');

        if ($enabled) {
            $db = Database::getConnection();

            $db->merge('node_counter')
                ->key('nid', $entity->id())
                ->fields(array(
                    'totalcount' => 1,
                    'timestamp' => REQUEST_TIME,
                ))
                ->expression('totalcount', 'totalcount + 1')
                ->execute();

            $query = $db->select('node_counter');
            $query->fields('node_counter', ['totalcount'])->condition('nid', $entity->id());

            $data = $query->execute();

            $count = $data->fetchAssoc();
        }

        return [
            "totalcount" => $count['totalcount'],
            "daycount" =>  $count['totalcount']
        ];
    }
}
