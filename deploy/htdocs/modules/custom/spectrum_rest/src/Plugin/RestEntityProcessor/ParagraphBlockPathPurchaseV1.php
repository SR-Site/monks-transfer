<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockpathpurchase_v1",
 *   label = @Translation("Paragraph: blockpathpurchase"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockpathpurchase",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPathPurchaseV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $blocks = $this->fieldProcessor->getFieldData($entity->field_path_blocks);

    // slides needs to be always an array.
    if (count($entity->field_path_blocks) == 1) {
      $blocks = [$blocks];
    }

    $data = [
      'id' => 'BlockPathPurchase',
      'data' => [
        "title" => $this->fieldProcessor->getFieldData($entity->field_title),
        "description" => $this->fieldProcessor->getFieldData($entity->field_description),
        "background_image" => $this->fieldProcessor->getFieldData($entity->field_image),
        "blocks" => $blocks,
      ],
    ];

    return $data;
  }

}
