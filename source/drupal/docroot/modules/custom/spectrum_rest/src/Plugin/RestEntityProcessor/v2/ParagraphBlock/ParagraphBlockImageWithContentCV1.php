<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_image_with_content_c_v1",
 *   label = @Translation("Paragraph: Block Image With Content C"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_image_with_content_c",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageWithContentCV1 extends ParagraphBlockImageWithContentBV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get data from Paragraph: Block Image With Content B and change ID.
    $data = parent::getItemData($entity);
    $data['id'] = 'ImageWithContentC';

    return $data;
  }

}
