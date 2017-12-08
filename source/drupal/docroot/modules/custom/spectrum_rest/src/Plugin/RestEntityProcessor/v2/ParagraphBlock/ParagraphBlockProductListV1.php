<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_product_list_v1",
 *   label = @Translation("Paragraph: Block Product List"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_product_list",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockProductListV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'ProductList',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'products' => $this->getItems($entity->get('field_products'), ['view_mode' => 'product_item']),
      ],
    ];

    return $data;
  }

}
