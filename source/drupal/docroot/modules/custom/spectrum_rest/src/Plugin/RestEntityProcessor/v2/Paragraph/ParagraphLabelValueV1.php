<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_label_and_value_v1",
 *   label = @Translation("Paragraph: Label and Value"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "label_and_value",
 *   view_mode = "default"
 * )
 */
class ParagraphLabelValueV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get Glossary A item.
    $data = [
      'label' => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      'value' => $this->fieldProcessor->getFieldData($entity->get('field_text_value')),
    ];

    return $data;
  }

}
