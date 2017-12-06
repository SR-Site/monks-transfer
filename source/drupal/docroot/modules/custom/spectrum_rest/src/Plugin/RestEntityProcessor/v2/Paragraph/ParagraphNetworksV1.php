<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_networks_v1",
 *   label = @Translation("Paragraph: Networks"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "networks",
 *   view_mode = "default"
 * )
 */
class ParagraphNetworksV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get networks.
    $data = $data + [
      'items' => $this->getNetworks(4),
    ];
    $data['link'] = [
      "label" => "All Networks",
      "title" => "All Networks",
      "target" => "featured-programs/networks",
      "type" => 0,
    ];

    return $data;
  }

  /**
   * Get networks.
   *
   * @param int $range
   *   Range in query.
   *
   * @return array|mixed
   *   Array of networks.
   *
   * @throws \Exception
   */
  protected function getNetworks($range) {
    $networks = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'network')
      ->condition('status', 1)
      ->range(0, $range);
    $results = $query->execute();
    if (!empty($results)) {
      $networkEntities = Node::loadMultiple($results);
      foreach ($networkEntities as $networkEntity) {
        $networks[] = $this->entityProcessor->getEntityData($networkEntity, 'v1', ['view_mode' => 'teaser']);
      }
    }
    return $networks;
  }

}
