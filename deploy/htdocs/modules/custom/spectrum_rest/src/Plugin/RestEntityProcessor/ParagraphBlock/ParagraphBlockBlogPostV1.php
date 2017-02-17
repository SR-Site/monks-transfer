<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class ParagraphBlockBlogPostV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);
    $article = $this->fieldProcessor->getFieldData($entity->get('field_article'), ['view_mode' => 'teaser']);

    $data = [
      "id" => 'blogPost',
      "data" => $data + $article,
    ];

    return $data;
  }

}
