<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_teaser_v1",
 *   label = @Translation("Node: Show - Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "teaser"
 * )
 */
class NodeShowTeaserV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "title" => $entity->label(),
      "tags" => $this->fieldProcessor->getFieldData($entity->field_tags),
    ];

    return $data;
  }

}
