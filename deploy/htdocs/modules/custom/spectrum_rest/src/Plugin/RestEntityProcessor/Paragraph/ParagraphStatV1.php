<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_stat_v1",
 *   label = @Translation("Paragraph: stat"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "stat",
 *   view_mode = "default"
 * )
 */
class ParagraphStatV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "description" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "value" => $this->fieldProcessor->getFieldData($entity->get('field_value')),
    ];

    return $data;
  }

}
