<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_blog_post_b_v1",
 *   label = @Translation("Paragraph: Block Blog Post B"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_blog_post_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockBlogPostBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'BlogPostB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'items' => $this->fieldProcessor->getFieldData($entity->get('field_blog_post_items')),
      ],
    ];

    return $data;
  }

}
