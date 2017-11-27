<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_core_product_message_item_v1",
 *   label = @Translation("Paragraph: Core product message item"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "core_product_message_item",
 *   view_mode = "default"
 * )
 */
class ParagraphCoreProductMessageItemV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get Core product message item.
    $data = [
      'value' => $this->fieldProcessor->getFieldData($entity->get('field_text_value')),
      'label' => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
    ];

    return $data;
  }

}
