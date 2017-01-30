<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_personas_v1",
 *   label = @Translation("Paragraph: personas"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "personas",
 *   view_mode = "default"
 * )
 */
class ParagraphPersonasV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "personaType" => (int) $entity->get('field_persona_type')->value,
      "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      "image" => $this->image($entity->get('field_image')),
    ];

    return $data;
  }

}
