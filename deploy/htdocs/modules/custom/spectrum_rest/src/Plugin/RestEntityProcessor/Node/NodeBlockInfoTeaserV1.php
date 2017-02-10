<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_block_info_teaser_v1",
 *   label = @Translation("Node: Block info - Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "block_info",
 *   view_mode = "teaser"
 * )
 */
class NodeBlockInfoTeaserV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
