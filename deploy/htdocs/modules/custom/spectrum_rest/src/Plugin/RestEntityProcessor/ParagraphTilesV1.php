<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_tile_v1",
 *   label = @Translation("Paragraph: tile"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "tile",
 *   view_mode = "default"
 * )
 */
class ParagraphTilesV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'background_image' => $this->fieldProcessor->getFieldData($entity->field_image),
      'background_image_blur' => $this->fieldProcessor->getFieldData($entity->field_image2),
      'title' => $this->fieldProcessor->getFieldData($entity->field_title),
      'description' => $this->fieldProcessor->getFieldData($entity->field_description),
      'category' => $this->fieldProcessor->getFieldData($entity->field_category),
    ];

    return $data;
  }

}
