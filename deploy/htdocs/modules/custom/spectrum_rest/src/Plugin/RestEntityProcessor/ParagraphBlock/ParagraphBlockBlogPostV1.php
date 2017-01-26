<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockblogpost_v1",
 *   label = @Translation("Paragraph: blockblogpost"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockblogpost",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockBlogPostV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockBlogPost',
      "data" => $data,
    ];

    return $data;
  }

}
