<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_content_v1",
 *   label = @Translation("Paragraph: content"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "content",
 *   view_mode = "default"
 * )
 */
class ParagraphContentV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "title" => $this->fieldProcessor->getFieldData($entity->field_title),
      "image" => $this->fieldProcessor->getFieldData($entity->field_image),
      "content" => $this->fieldProcessor->getFieldData($entity->field_description),
    ];

    return $data;
  }

}
