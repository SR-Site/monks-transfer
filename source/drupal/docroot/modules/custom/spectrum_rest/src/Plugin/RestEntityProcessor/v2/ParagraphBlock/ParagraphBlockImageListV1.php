<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_image_list_v1",
 *   label = @Translation("Paragraph: Block Image List"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_image_list",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageListV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'ImageList',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'slides' => $this->fieldProcessor->getFieldData($entity->get('field_image_list_slides')),
      ],
    ];

    return $data;
  }

}
