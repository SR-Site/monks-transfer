<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_main_product_nav_v1",
 *   label = @Translation("Paragraph: Block Main Product Nav"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_main_product_nav",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMainProductNavV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'MainProductNav',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'items' => $this->fieldProcessor->getFieldData($entity->get('field_product_items'), ['view_mode' => 'main']),
      ],
    ];

    return $data;
  }

}
