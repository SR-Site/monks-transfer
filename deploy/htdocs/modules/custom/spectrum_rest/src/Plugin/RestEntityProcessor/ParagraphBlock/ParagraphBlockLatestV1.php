<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocklatest_v1",
 *   label = @Translation("Paragraph: blocklatest"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocklatest",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLatestV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $styles = $this->fieldProcessor->getFieldData($entity->get('field_styles'));

    $data = [
      "id" => 'blockLatest',
      "data" => $styles + [
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "articles" => $this->getItems($entity->get('field_articles'), ['view_mode' => 'teaser']),
      ],
    ];

    return $data;
  }

}
