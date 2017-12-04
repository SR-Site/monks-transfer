<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_success_story_a_v1",
 *   label = @Translation("Paragraph: Block Success Story A"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_success_stories_a",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSuccessStoryAV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get story highlight.
    $successStory = $this->fieldProcessor->getFieldData($entity->get('field_article'), ['view_mode' => 'success_story_a']);

    // Get common and add success story.
    $data = $this->getCommonData($entity) + $successStory;

    // Get rest of the data.
    $data = [
      'id' => 'SuccessStoriesA',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
      ],
    ];

    return $data;
  }

}
