<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_video_with_content_c_v1",
 *   label = @Translation("Paragraph: Block Video With Content C"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_video_with_content_c",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockVideoWithContentCV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'VideoWithContentC',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'video' => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        'poster' => $this->fieldProcessor->getFieldData($entity->get('field_poster')),
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      ],
    ];

    return $data;
  }

}
