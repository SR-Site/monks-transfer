<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockshowoverviewdetail_v1",
 *   label = @Translation("Paragraph: blockshowoverviewdetail"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockshowoverviewdetail",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockShowOverviewDetailV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockShowOverview',
      'data' => [
        "show" => $this->fieldProcessor->getFieldData($entity->field_show),
      ],
    ];

    return $data;
  }

}
