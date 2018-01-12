<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;
use Drupal\spectrum_shows\Entity\Network;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_network_teaser_v1",
 *   label = @Translation("Node: Network Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "network",
 *   view_mode = "teaser"
 * )
 */
class NodeNetworkTeaserV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    /** @var \Drupal\spectrum_shows\Entity\Network $networkEntity */
    $networkEntity = $entity->get('field_network')->entity;

    if ($networkEntity instanceof Network) {
      $data = [
        'image' => $this->image($networkEntity->get('image')),
        'paragraph' => $this->fieldProcessor->getFieldData($networkEntity->get('description')),
        // 'target' => $entity->toUrl()->toString(),
      ];
    }
    $data['heading'] = $entity->label();

    return $data;
  }

}
