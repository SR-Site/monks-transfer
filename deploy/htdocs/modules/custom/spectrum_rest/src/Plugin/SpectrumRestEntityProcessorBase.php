<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\Core\Datetime\DateFormatter;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_rest\Plugin\RestFieldProcessorManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Common class for Paragraph blocks.
 *
 * @package Drupal\spectrum_rest\Plugin
 */
abstract class SpectrumRestEntityProcessorBase extends RestEntityProcessorBase {

  /**
   * The Alias Manager service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The Date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatter
   */
  protected $dateFormatter;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\mm_rest\Plugin\RestFieldProcessorManager $field_processor
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   * @param \Drupal\Core\Datetime\DateFormatter $date_formatter
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, RestFieldProcessorManager $field_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, EntityRepositoryInterface $entity_repository, AliasManagerInterface $alias_manager, DateFormatter $date_formatter) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $field_processor, $cacheable_metadata_collector, $entity_repository);
    $this->aliasManager = $alias_manager;
    $this->dateFormatter = $date_formatter;
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
      $container->get('path.alias_manager'),
      $container->get('date.formatter')
    );
  }

  /**
   * Common properties for all Paragraph blocks.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   * @return array|string
   */
  public function getCommonData(ContentEntityInterface $entity) {
    return $this->fieldProcessor->getFieldData($entity->get('field_styles'));
  }

  /**
   * Make sure that it is always an array.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   * @param array $options
   * @return array|string
   */
  public function getItems(FieldItemListInterface $field, $options = []) {
    // It have to be always an array.
    $items = $this->fieldProcessor->getFieldData($field, $options);

    /** @var \Drupal\Core\Field\FieldStorageDefinitionInterface $fieldStorage */
    $fieldStorage = $field->getFieldDefinition()->getFieldStorageDefinition();
    if (empty($items) && $fieldStorage->isMultiple()) {
      $items = [];
    }

    if (count($field) == 1) {
      $items = [$items];
    }

    return $items;
  }

  /**
   * Returns an image formatted.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   * @param array $options
   * @return array
   */
  public function image(FieldItemListInterface $field, array $options = []) {
    $image = $field->getValue();

    if (empty($image)) {
      return NULL;
    }

    $data =  [
      'normal' => $this->fieldProcessor->getFieldData($field, $options),
      'small' => $this->fieldProcessor->getFieldData($field, $options),
      'alt' => isset($image[0]['alt']) ? $image[0]['alt'] : "",
    ];

    return $data;
  }

  /**
   * Returns an array of taxonomy terms from all vocabularies.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   * @return array|string
   */
  protected function getTags(ContentEntityInterface $entity) {
    $tags = [];

    $tags = array_merge($tags, $this->getItems($entity->get('field_category')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_document_type')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_market')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_platform')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_thought_leadership')) ?: []);

    return $tags;
  }

}
