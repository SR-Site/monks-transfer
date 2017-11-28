<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_multiple_images_v1",
 *   label = @Translation("Paragraph: Block Audience Product Top"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_multiple_images",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMultipleImagesV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and add success story.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'MultipleImages',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'primaryItem' => $this->fieldProcessor->getFieldData($entity->get('field_primary_item')),
        'secondaryItem' => $this->fieldProcessor->getFieldData($entity->get('field_secondary_item')),
        'tertiaryItem' => $this->fieldProcessor->getFieldData($entity->get('field_tertiary_item')),
        'quaternaryItem' => $this->fieldProcessor->getFieldData($entity->get('field_quaternary_item')),
        'quinaryItem' => $this->fieldProcessor->getFieldData($entity->get('field_quinary_item')),
      ],
    ];

    return $data;
  }

}
