<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_target_audience_v1",
 *   label = @Translation("Paragraph: Block Target Audience"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_target_audience",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockTargetAudienceV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'TargetAudience',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        'devices' => $this->fieldProcessor->getFieldData($entity->get('field_devices')),
        'backgroundImage' => $this->fieldProcessor->getFieldData($entity->get('field_background_image'))
      ],
    ];

    return $data;
  }

}
