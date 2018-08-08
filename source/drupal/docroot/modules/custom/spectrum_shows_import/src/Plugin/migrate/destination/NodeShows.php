<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\node\NodeInterface;
use Drupal\views\Plugin\views\area\Entity;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\migrate\Plugin\migrate\destination\EntityContentBase;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\Core\TypedData\TypedDataInterface;

/**
 * Provides node destination, updating only the non-empty fields.
 *
 * @MigrateDestination(
 *   id = "node_shows",
 * )
 */
class NodeShows  extends EntityContentBase {

  /**
   * Entity type.
   *
   * @var string $entityType
   */
  public static $entityType = 'node';

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {
    return parent::create($container, $configuration, 'entity:' . static::$entityType, $plugin_definition, $migration);
  }

  /**
   * {@inheritdoc}
   */
  protected function updateEntity(EntityInterface $entity, Row $row) {
    // By default, an update will be preserved.
    $rollback_action = MigrateIdMapInterface::ROLLBACK_PRESERVE;

    // Make sure we have the right translation.
    if ($this->isTranslationDestination()) {
      $property = $this->storage->getEntityType()->getKey('langcode');
      if ($row->hasDestinationProperty($property)) {
        $language = $row->getDestinationProperty($property);
        if (!$entity->hasTranslation($language)) {
          $entity->addTranslation($language);

          // We're adding a translation, so delete it on rollback.
          $rollback_action = MigrateIdMapInterface::ROLLBACK_DELETE;
        }
        $entity = $entity->getTranslation($language);
      }
    }

    // If the migration has specified a list of properties to be overwritten,
    // clone the row with an empty set of destination values, and re-add only
    // the specified properties.
    if (isset($this->configuration['overwrite_properties'])) {
      $clone = $row->cloneWithoutDestination();
      foreach ($this->configuration['overwrite_properties'] as $property) {
        $clone->setDestinationProperty($property, $row->getDestinationProperty($property));
      }
      $row = $clone;
    }

    $source = $row->getSource();

    // Remove unnecessary schedules.
    $this->removeSchedules($entity);

    // Update fields.
    $this->updateFields($entity, $row);

    $this->setRollbackAction($row->getIdMap(), $rollback_action);

    // We might have a different (translated) entity, so return it.
    return $entity;
  }

  /**
   * @param \Drupal\Core\Entity\EntityInterface $entity
   */
  protected function removeSchedules(EntityInterface $entity) {
    if ($entity instanceof NodeInterface && $entity->hasField('field_show_schedules')) {
      $schedules = $entity->get('field_show_schedules')->getValue();
      $numberSchedules = count($schedules);
      if ($numberSchedules > 5) {
        foreach ($schedules as $key => $scheduleItem) {
          if ($key < ($numberSchedules - 5)) {
            if (isset($entity->get('field_show_schedules')->list) && array_key_exists($key, $entity->get('field_show_schedules')->list)) {
              $entity->get('field_show_schedules')->removeItem($key);
            }
          }
        }
      }
    }
  }

  /**
   * @param \Drupal\Core\Entity\EntityInterface $entity
   * @param \Drupal\migrate\Row $row
   *
   * @throws \Drupal\Core\TypedData\Exception\ReadOnlyException
   */
  protected function updateFields(EntityInterface $entity, Row $row) {
    foreach ($row->getDestination() as $field_name => $values) {
      $field = $entity->$field_name;
      if ($field instanceof TypedDataInterface) {
        // Update field ONLY if the destination entity has no value for it.
        if (empty($values) && !empty($field->getValue())) {
          continue;
        }
        else {
          $field->setValue($values);
        }
      }
    }
  }

}
