<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

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
    $blocks = [];
    // Get show detail.
    $showDetail = $this->entityProcessor->getEntityData($entity, 'v1', ['view_mode' => 'detail']);
    $showDetailBlock = [
      'id' => 'ShowDetail',
      'data' => $showDetail,
    ];
    $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_hero_quaternary'));
    $blocks[] = $showDetailBlock;
    $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_audience_statistics'));
    $blocks[] = $this->fieldProcessor->getFieldData($entity->get('field_success_stories_a'));

    $data = [
      'title' => $entity->label(),
      'blocks' => $blocks,
    ];

    return $data;
  }

}
