<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blog_post_item_v1",
 *   label = @Translation("Paragraph: Blog Post Item"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blog_post_item",
 *   view_mode = "default"
 * )
 */
class ParagraphBlogPostItemV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get Glossary A item.
    $data = [
      'heading' => $this->fieldProcessor->getFieldData($entity->get('field_blog_post_item_heading')),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_blog_post_item_paragraph')),
    ];

    return $data;
  }

}
