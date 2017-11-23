<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_heading_v1",
 *   label = @Translation("Paragraph: Heading"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "heading",
 *   view_mode = "default"
 * )
 */
class ParagraphHeadingV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get text and tag and create markup.
    $text = $this->fieldProcessor->getFieldData($entity->get('field_heading_text'));
    $tag = $this->fieldProcessor->getFieldData($entity->get('field_heading_tag'));

    $markup = [
      '#type' => 'html_tag',
      '#tag' => $tag,
      '#value' => $text,
    ];

    $data = render($markup);

    return $data;
  }

}
