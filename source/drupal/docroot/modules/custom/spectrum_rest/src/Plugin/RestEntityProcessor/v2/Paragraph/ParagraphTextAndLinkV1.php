<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_text_and_link_v1",
 *   label = @Translation("Paragraph: Text And Link"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "text_and_link",
 *   view_mode = "default"
 * )
 */
class ParagraphTextAndLinkV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get heading and paragraph.
    $data = $this->getNormalHeadingParagraphData($entity);
    // Get image and video.
    $data = $data + [
      'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
    ];

    return $data;
  }

}
