<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_network_network_overview_v1",
 *   label = @Translation("Node: Network Overview"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "network",
 *   view_mode = "network_overview"
 * )
 */
class NodeNetworkNetworkOverviewV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [];

    /** @var \Drupal\spectrum_shows\Entity\Network $networkEntity */
    $networkEntity = $entity->get('field_network')->entity;

    if ($networkEntity instanceof Network) {
      $data['image'] = $this->image($networkEntity->get('image'));
    }

    return $data;
  }

}
