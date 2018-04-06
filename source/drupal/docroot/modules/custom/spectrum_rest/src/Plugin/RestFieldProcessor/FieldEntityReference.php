<?php

namespace Drupal\spectrum_rest\Plugin\RestFieldProcessor;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\mm_rest\Plugin\RestFieldProcessorBase;

/**
 * Returns the (structured) data of a field.
 *
 * @RestFieldProcessor(
 *   id = "field_entity_reference",
 *   label = @Translation("Entity reference"),
 *   field_types = {
 *     "entity_reference",
 *     "entity_reference_revisions"
 *   }
 * )
 */
class FieldEntityReference extends RestFieldProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($field, $options = []) {

    /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
    $entity = $field->get('entity')->getValue();
    if (!$entity || !$entity->access('view')) {
      return NULL;
    }
    $data = $this->entityProcessor->getEntityData($entity, $this->requestVersion(), $options);
    $this->cacheabilityCollector->addCacheableDependency($entity);
    return $data;
  }

}
