<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocklandingpageinfographic_v1",
 *   label = @Translation("Paragraph: blocklandingpageinfographic"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocklandingpageinfographic",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLandingPageInfographicV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockLandingPageInfographic',
      'data' => [
        "title" => $this->fieldProcessor->getFieldData($entity->field_title),
        "background_image" => $this->fieldProcessor->getFieldData($entity->field_image),
      ],
    ];

    return $data;
  }

}
