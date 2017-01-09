<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmainproducts_v1",
 *   label = @Translation("Paragraph: blockmainproducts"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmainproducts",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMainProductsV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $tiles = $this->fieldProcessor->getFieldData($entity->field_tiles);

    // slides needs to be always an array.
    if (count($entity->field_tiles) == 1) {
      $tiles = [$tiles];
    }

    $data = [
      'id' => 'BlockMainProducts',
      'data' => [
        "tiles" => $tiles,
      ],
    ];

    return $data;
  }

}
