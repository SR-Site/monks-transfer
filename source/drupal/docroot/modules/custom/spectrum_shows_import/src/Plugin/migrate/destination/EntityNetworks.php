<?php

namespace Drupal\spectrum_shows_import\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\Row;
use Drupal\Core\TypedData\TypedDataInterface;

/**
 * Provides node destination, updating only the non-empty fields.
 *
 * @MigrateDestination(
 *   id = "entity_networks",
 * )
 */
class EntityNetworks extends NodeShows {

  /**
   * Entity type.
   *
   * @var string $entityType
   */
  public static $entityType = 'network';

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
        if ($field_name == 'description' || (empty($values) && !empty($field->getValue()))) {
          continue;
        }
        else {
          $field->setValue($values);
        }
      }
    }
  }
}