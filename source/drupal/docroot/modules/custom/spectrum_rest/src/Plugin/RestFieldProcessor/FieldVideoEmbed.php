<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestFieldProcessorBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\video_embed_field\ProviderManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_video_embed",
 *   label = @Translation("Video embed"),
 *   field_types = {
 *     "video_embed_field"
 *   }
 * )
 */
class FieldVideoEmbed extends RestFieldProcessorBase {

  /**
   * Video Embed field Provider Manager.
   *
   * @var \Drupal\video_embed_field\ProviderManagerInterface
   */
  protected $providerManager;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   * @param \Drupal\video_embed_field\ProviderManagerInterface
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, ProviderManagerInterface $provider_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $cacheable_metadata_collector);
    $this->providerManager = $provider_manager;
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
      $container->get('video_embed_field.provider_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = array()) {
    /** @var \Drupal\video_embed_field\ProviderPluginInterface $provider */
    $provider = $this->providerManager->loadProviderFromInput($field->value);

    $data = [
      'url' => $field->value,
      'id' => $provider->getIdFromInput($field->value),
      'provider' => $provider->getPluginId(),
    ];

    return $data;
  }

}
