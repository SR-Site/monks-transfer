<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_block_double_image_v1",
 *   label = @Translation("Paragraph: Block Double Image"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_double_image",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockDoubleImageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get primary and secondary image.
    $images = $this->fieldProcessor->getFieldData($entity->get('field_two_images'));
    $imagesArray = [];
    foreach ($images as $key => $image) {
      $keyImage = 'primaryImage';
      if ($key == 1) {
        $keyImage = 'secondaryImage';
      }
      $imagesArray[$keyImage] = $image;
    }

    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'DoubleImage',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'primaryImage' => $imagesArray['primaryImage'] ? $imagesArray['primaryImage'] : NULL,
        'secondaryImage' => $imagesArray['secondaryImage'] ? $imagesArray['secondaryImage'] : NULL,
      ],
    ];

    return $data;
  }

}
