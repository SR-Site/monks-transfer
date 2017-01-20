<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockimagecarousel_v1",
 *   label = @Translation("Paragraph: blockimagecarousel"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockimagecarousel",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageCarouselV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'imageCarousel',
      "data" => $data + [
        "slides" => $this->getItems($entity->get('field_slides')),
      ],
    ];

    return $data;
  }

}
