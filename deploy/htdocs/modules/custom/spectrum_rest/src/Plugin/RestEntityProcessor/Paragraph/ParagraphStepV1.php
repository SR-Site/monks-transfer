<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_step_v1",
 *   label = @Translation("Paragraph: step"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "step",
 *   view_mode = "default"
 * )
 */
class ParagraphStepV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "icon" => $this->fieldProcessor->getFieldData($entity->get('field_key')),
    ];

    return $data;
  }

}
