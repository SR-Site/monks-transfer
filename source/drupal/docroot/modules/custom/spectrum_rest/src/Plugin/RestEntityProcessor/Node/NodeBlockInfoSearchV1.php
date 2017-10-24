<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_block_info_search_v1",
 *   label = @Translation("Node: Block info - Search"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "block_info",
 *   view_mode = "search"
 * )
 */
class NodeBlockInfoSearchV1 extends NodeBlockInfoTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "id" => "info",
      "data" => parent::getItemData($entity),
    ];

    return $data;
  }

}
