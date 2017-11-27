<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_success_stories_b_v1",
 *   label = @Translation("Paragraph: Block Success Stories B"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_success_stories_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSuccessStoriesBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'SuccessStoriesB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'alignment' => (int) $entity->get('field_alignment')->value,
        'stories' => $this->getItems($entity->get('field_articles'), ['view_mode' => 'success_story_b']),
      ],
    ];

    return $data;
  }

}
