<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_program_v1",
 *   label = @Translation("Paragraph: program"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "program",
 *   view_mode = "default"
 * )
 */
class ParagraphProgramV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "image" => $this->image($entity->get('field_image')),
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "stats" => [
        "percentage" => $this->fieldProcessor->getFieldData($entity->get('field_percentage')),
        "demographic" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      ],
      "video" => $entity->get('field_video')->isEmpty() ? NULL : $this->fieldProcessor->getFieldData($entity->get('field_video')),
      "tags" => $this->getItems($entity->get('field_tags'))
    ];

    return $data;
  }

}
