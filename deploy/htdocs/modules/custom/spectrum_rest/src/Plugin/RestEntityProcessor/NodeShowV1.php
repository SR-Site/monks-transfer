<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_v1",
 *   label = @Translation("Node: Show"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "default"
 * )
 */
class NodeShowV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $show_metric = $this->fieldProcessor->getFieldData($entity->field_show_metric);

    // show_metric needs to be always an array.
    if (count($entity->field_show_metric) == 1) {
      $show_metric = [$show_metric];
    }

    $data = [
      "title" => $entity->label(),
      "image" => $this->fieldProcessor->getFieldData($entity->field_image),
      "video" => $this->fieldProcessor->getFieldData($entity->field_video_external),
      "broadcast_schedule" => $this->fieldProcessor->getFieldData($entity->field_broadcast_schedule),
      "show_metric" => $show_metric,
      "tags" => $this->fieldProcessor->getFieldData($entity->field_tags),
    ];

    return $data;
  }

}
