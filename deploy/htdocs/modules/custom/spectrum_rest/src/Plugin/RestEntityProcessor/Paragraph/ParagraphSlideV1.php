<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_slide_v1",
 *   label = @Translation("Paragraph: slide"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "slide",
 *   view_mode = "default"
 * )
 */
class ParagraphSlideV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "image" => $this->image($entity->get('field_image')),
      "theme" => (int) $entity->get('field_theme')->value,
      "video" => $this->fieldProcessor->getFieldData($entity->get('field_video')),
    ];

    return $data;
  }

}
