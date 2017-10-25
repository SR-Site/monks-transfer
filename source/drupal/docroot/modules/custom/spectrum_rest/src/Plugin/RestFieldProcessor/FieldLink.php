<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestFieldProcessorBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_link",
 *   label = @Translation("Link"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class FieldLink extends RestFieldProcessorBase {

  /**
   * The Path AliasManager service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $pathAliasManager;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   * @param \Drupal\Core\Path\AliasManagerInterface $path_alias_manager
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, AliasManagerInterface $path_alias_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $cacheable_metadata_collector);
    $this->pathAliasManager = $path_alias_manager;
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
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('path.alias_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    $url = UrlHelper::stripDangerousProtocols($field->uri);
    $external = UrlHelper::isExternal($url);

    if (!$external) {
      $url = $this->pathAliasManager->getAliasByPath("/$url");
    }

    $data = [
      'target' => $url,
      'type' => $external ? 2 : 1,
    ];

    return $data;
  }
}