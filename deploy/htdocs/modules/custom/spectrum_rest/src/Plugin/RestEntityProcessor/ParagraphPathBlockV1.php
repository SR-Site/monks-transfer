<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_pathblock_v1",
 *   label = @Translation("Paragraph: pathblock"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "pathblock",
 *   view_mode = "default"
 * )
 */
class ParagraphPathBlockV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "title" => $this->fieldProcessor->getFieldData($entity->field_title),
      "description" => $this->fieldProcessor->getFieldData($entity->field_description),
    ];

    return $data;
  }

}
