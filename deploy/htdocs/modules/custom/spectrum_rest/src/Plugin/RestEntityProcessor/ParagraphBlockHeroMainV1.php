<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockheromain_v1",
 *   label = @Translation("Paragraph: blockheromain"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockheromain",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroMainV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $slides = $this->fieldProcessor->getFieldData($entity->field_slides);

    // slides needs to be always an array.
    if (count($entity->field_media_multiple) == 1) {
      $slides = [$slides];
    }

    $data = [
      'id' => 'BlockHeroMain',
      'data' => [
        "slides" => $slides,
      ],
    ];

    return $data;
  }

}
