<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_network_search_v1",
 *   label = @Translation("Node: Network search"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "network",
 *   view_mode = "search"
 * )
 */
class NodeNetworkSearchV1 extends NodeNetworkTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data['id'] = 'audienceTeaser';
    $data['data'] = parent::getItemData($entity);

    return $data;
  }

}
