<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_statistics_b_v1",
 *   label = @Translation("Paragraph: Block Audience Statistics B"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_statistics_b",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceStatisticsBV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    // Get rest of the data.
    $data = [
      'id' => 'AudienceStatisticsB',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
        'cta' => $this->fieldProcessor->getFieldData($entity->get('field_cta')),
        'statistics' => $this->fieldProcessor->getFieldData($entity->get('field_audience_statistics')),
      ],
    ];

    return $data;
  }

}
