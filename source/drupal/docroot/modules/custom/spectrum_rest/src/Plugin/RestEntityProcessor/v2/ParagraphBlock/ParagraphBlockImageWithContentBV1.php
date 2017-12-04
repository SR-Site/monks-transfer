<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_image_with_content_b_v1",
 *   label = @Translation("Paragraph: Block Image With Content B"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_image_with_content_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageWithContentBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'ImageWithContentB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'alignment' => (int) $entity->get('field_alignment')->value,
        'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
      ],
    ];

    return $data;
  }

}
