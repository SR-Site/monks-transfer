<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockdetailpagenews_v1",
 *   label = @Translation("Paragraph: blockdetailpagenews"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockdetailpagenews",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockDetailPageNewsV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockDetailPageNews',
      'data' => $this->fieldProcessor->getFieldData($entity->field_news_item),
    ];

    return $data;
  }

}
