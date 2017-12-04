<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_slide_item_v1",
 *   label = @Translation("Paragraph: slide item"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "slide_item",
 *   view_mode = "default"
 * )
 */
class ParagraphSlideItemV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get image and video.
    $data = $data + [
      'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
    ];

    return $data;
  }

}
