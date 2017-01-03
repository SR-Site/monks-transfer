<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockplanbuymeasure_v1",
 *   label = @Translation("Paragraph: blockplanbuymeasure"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockplanbuymeasure",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPlanBuyMeasureV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $contents = $this->fieldProcessor->getFieldData($entity->field_contents);

    // contents needs to be always an array.
    if (count($entity->field_contents) == 1) {
      $contents = [$contents];
    }

    $data = [
      'id' => 'BlockPlanBuyMeasure',
      'data' => [
        "contents" => $contents,
      ],
    ];

    return $data;
  }

}
