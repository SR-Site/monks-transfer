<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\Core\StringTranslation\StringTranslationTrait;
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

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get networks.
    $data = $data + [
      'items' => $this->fieldProcessor->getFieldData($entity->get('field_network_items'), ['view_mode' => 'teaser']),
    ];
    $data['link'] = [
      "label" => $this->t('See all networks'),
      "title" => $this->t('See all networks'),
      "target" => "/networks",
      "type" => 0,
    ];

    return $data;
  }

}
