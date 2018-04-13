<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\node\Entity\Node;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmarketmap_v1",
 *   label = @Translation("Paragraph: blockmarketmap"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmarketmap",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMarketMapV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'marketMap',
      "data" => $data + [
        'info' => [
          'heading' => $this->fieldProcessor->getFieldData($entity->get('field_title')),
          'copy' => $this->fieldProcessor->getFieldData($entity->get('field_subheading'))
        ],
        "notFoundMessage" => $this->fieldProcessor->getFieldData($entity->get('field_description')),
        "searchPlaceholder" => $this->fieldProcessor->getFieldData($entity->get('field_filter_label')),
        "searchLabel" => strip_tags($this->fieldProcessor->getFieldData($entity->get('field_heading'))),
        "contactButton" => $this->fieldProcessor->getFieldData($entity->get('field_cta')),
      ],
    ];

    // Get markets.
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'market')
      ->condition('status', 1);
    $results = $query->execute();

    $data['data']['markets'] = [];
    if (!empty($results)) {
      $markets = Node::loadMultiple($results);
      foreach ($markets as $market) {
        $data['data']['markets'][] = $this->entityProcessor->getEntityData($market, 'v1', ['view_mode' => 'teaser']);
      }
    }


    return $data;
  }

}
