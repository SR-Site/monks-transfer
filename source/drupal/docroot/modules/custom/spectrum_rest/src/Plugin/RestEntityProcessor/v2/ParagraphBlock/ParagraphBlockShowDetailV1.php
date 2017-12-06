<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_show_detail_v1",
 *   label = @Translation("Paragraph: Block Show Detail"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_show_detail",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockShowDetailV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get story highlight.
    $showDetail = $this->fieldProcessor->getFieldData($entity->get('field_show'), ['view_mode' => 'detail']);

    // Get common and add success story.
    $data = $this->getCommonData($entity) + $showDetail;

    // Get rest of the data.
    $data = [
      'id' => 'ShowDetail',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
      ],
    ];

    return $data;
  }

}
