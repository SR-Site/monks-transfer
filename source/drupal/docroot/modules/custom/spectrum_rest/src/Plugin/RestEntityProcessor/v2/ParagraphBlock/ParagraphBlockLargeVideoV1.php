<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_large_video_v1",
 *   label = @Translation("Paragraph: Block Large Video"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_large_video",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLargeVideoV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'LargeVideo',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'video' => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        'poster' => $this->fieldProcessor->getFieldData($entity->get('field_poster')),
      ],
    ];

    return $data;
  }

}
