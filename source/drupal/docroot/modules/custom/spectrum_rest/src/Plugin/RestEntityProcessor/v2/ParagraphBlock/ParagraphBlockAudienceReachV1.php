<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_reach_v1",
 *   label = @Translation("Paragraph: Block audience reach"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_reach",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceReachV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'AudienceReach',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'channels' => $this->fieldProcessor->getFieldData($entity->get('field_channels')),
      ],
    ];

    return $data;
  }

}
