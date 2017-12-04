<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_skills_v1",
 *   label = @Translation("Paragraph: Skills"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "skills",
 *   view_mode = "default"
 * )
 */
class ParagraphSkillsV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and skills.
    $data = [
      'heading' => $this->fieldProcessor->getFieldData($entity->get('field_main_heading')),
      'skills' => $this->fieldProcessor->getFieldData($entity->get('field_skills')),
    ];

    return $data;
  }

}
