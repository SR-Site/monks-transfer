<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_search_v1",
 *   label = @Translation("Node: Show - Search"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "search"
 * )
 */
class NodeShowSearchV1 extends NodeShowTeaserModeV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data['id'] = 'audienceTeaser';
    $data['data'] = parent::getItemData($entity);

    return $data;
  }

}
