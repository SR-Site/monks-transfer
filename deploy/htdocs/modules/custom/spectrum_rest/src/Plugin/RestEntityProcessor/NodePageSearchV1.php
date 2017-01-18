<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_rest\Plugin\RestFieldProcessorManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_pagesearch_v1",
 *   label = @Translation("Node: Page - Search"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "page",
 *   view_mode = "search"
 * )
 */
class NodePageSearchV1 extends RestEntityProcessorBase {

  /**
   * The Alias Manager service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\mm_rest\Plugin\RestFieldProcessorManager $field_processor
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, RestFieldProcessorManager $field_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, EntityRepositoryInterface $entity_repository, AliasManagerInterface $alias_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $field_processor, $cacheable_metadata_collector, $entity_repository);
    $this->aliasManager = $alias_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('plugin.manager.mm_rest_entity_processor'),
      $container->get('plugin.manager.mm_rest_field_processor'),
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('entity.repository'),
      $container->get('path.alias_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => (int)$entity->id(),
      'link' => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      'title' => $entity->label(),
    ];

    return $data;
  }

}
