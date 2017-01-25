<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmore_v1",
 *   label = @Translation("Paragraph: blockmore"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmore",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMoreV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $styles = $this->fieldProcessor->getFieldData($entity->get('field_styles'));

    $data = [
      "id" => 'more',
      "data" => $styles + [
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
        "tags" => $this->fieldProcessor->getFieldData($entity->get('field_links')),
        "articles" => $this->getItems($entity->get('field_articles'), ['view_mode' => 'teaser']),
      ],
    ];

    return $data;
  }

}
