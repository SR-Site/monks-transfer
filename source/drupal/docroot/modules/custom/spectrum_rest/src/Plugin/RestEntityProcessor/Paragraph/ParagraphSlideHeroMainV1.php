<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_slideheromain_v1",
 *   label = @Translation("Paragraph: slideheromain"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "slideheromain",
 *   view_mode = "default"
 * )
 */
class ParagraphSlideHeroMainV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $statistics = $this->fieldProcessor->getFieldData($entity->get('field_statistics'));

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "background" => $this->image($entity->get('field_image')),
      "backgroundVideo" => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
      "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      "statistics" => $statistics,
    ];

    return $data;
  }

}
