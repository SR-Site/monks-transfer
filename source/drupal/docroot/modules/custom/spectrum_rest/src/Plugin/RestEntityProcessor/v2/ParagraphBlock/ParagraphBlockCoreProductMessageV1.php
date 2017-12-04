<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_core_product_message_v1",
 *   label = @Translation("Paragraph: Block Core Product Message"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_core_product_message",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockCoreProductMessageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'CoreProductMessage',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'items' => $this->fieldProcessor->getFieldData($entity->get('field_cpm_items'))
      ],
    ];

    return $data;
  }

}
