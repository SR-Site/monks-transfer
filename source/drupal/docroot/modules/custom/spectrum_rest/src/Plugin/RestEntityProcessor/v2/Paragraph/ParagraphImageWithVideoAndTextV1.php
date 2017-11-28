<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_image_with_video_and_text_v1",
 *   label = @Translation("Paragraph: Image With Video And Text"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "image_with_video_and_text",
 *   view_mode = "default"
 * )
 */
class ParagraphImageWithVideoAndTextV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get image and video.
    $data = $data + [
      'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      'video' => $this->fieldProcessor->getFieldData($entity->get('field_video')),
    ];

    return $data;
  }

}
