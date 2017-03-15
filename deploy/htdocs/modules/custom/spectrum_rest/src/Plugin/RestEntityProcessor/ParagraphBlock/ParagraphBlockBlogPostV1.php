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

    $node = $entity->get('field_article');

    if ($node->isEmpty()) {
      // If the current page is not an article, avoid the exception and return
      // and empty object.
      try {
        $article = $this->entityProcessor->getEntityData($entity->getParentEntity(), 'v1', ['view_mode' => 'blogpost']);
      }
      catch (\Exception $e) {
        $article = [];
      }
    }
    else {
      $article = $this->fieldProcessor->getFieldData($node, ['view_mode' => 'blogpost']);
    }

    $data = [
      "id" => 'blogPost',
      "data" => $data + $article,
    ];

    return $data;
  }

}
