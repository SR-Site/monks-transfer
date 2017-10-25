<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_stepmap_v1",
 *   label = @Translation("Paragraph: stepmap"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "stepmap",
 *   view_mode = "default"
 * )
 */
class ParagraphStepMapV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "label" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
    ];

    return $data;
  }

}
