<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_top_programming_v1",
 *   label = @Translation("Paragraph: Block Audience Top Programming"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_top_programming",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceTopProgrammingV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'AudienceTopProgramming',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'slides' => $this->getItems($entity->get('field_shows'), ['view_mode' => 'audience_top_programming']),
      ],
    ];

    return $data;
  }

}
