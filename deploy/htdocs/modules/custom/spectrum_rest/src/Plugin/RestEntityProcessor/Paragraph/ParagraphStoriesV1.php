<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_stories_v1",
 *   label = @Translation("Paragraph: stories"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "stories",
 *   view_mode = "default"
 * )
 */
class ParagraphStoriesV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      "background" => $this->image($entity->get('field_image')),
      "backgroundBlurred" => $this->image($entity->get('field_image'), ['style' => 'blur']),
      "theme" => (int) $entity->get('field_theme')->value,
    ];

    return $data;
  }

}
