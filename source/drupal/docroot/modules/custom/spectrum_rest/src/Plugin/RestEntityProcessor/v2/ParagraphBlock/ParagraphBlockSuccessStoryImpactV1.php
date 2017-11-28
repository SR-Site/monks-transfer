<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_success_story_impact_v1",
 *   label = @Translation("Paragraph: Block Success Story Impact"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_success_story_impact",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSuccessStoryImpactV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'SuccessStoryImpact',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'statistics' => $this->fieldProcessor->getFieldData($entity->get('field_success_story_statistics')),
      ],
    ];

    return $data;
  }

}
