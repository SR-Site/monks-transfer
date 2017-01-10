<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_storyblockb_v1",
 *   label = @Translation("Paragraph: storyblockb"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "storyblockb",
 *   view_mode = "default"
 * )
 */
class ParagraphStoryBlockBV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'link' => $this->fieldProcessor->getFieldData($entity->field_link),
      'description' => $this->fieldProcessor->getFieldData($entity->field_description),
    ];

    return $data;
  }

}
