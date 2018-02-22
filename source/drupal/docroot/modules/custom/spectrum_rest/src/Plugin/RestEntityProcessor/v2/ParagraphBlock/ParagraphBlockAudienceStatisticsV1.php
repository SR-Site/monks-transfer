<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_audience_statistics_v1",
 *   label = @Translation("Paragraph: Block Audience Statistics"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_audience_statistics",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudienceStatisticsV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get common and heading and paragraph.
    $data = $this->getCommonData($entity) + $this->getHeadingParagraphData($entity);

    $audienceStatisticsItems = $this->fieldProcessor->getFieldData($entity->get('field_audience_statistics_items'));
    if (!isset($audienceStatisticsItems[0])) {
      $audienceStatisticsItems = [$audienceStatisticsItems];
    }

    // Get rest of the data.
    $data = [
      'id' => 'AudienceStatistics',
      'data' => $data + [
        'scrollId' => $this->fieldProcessor->getFieldData($entity->get('field_scroll_id')),
        'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
        'items' => $audienceStatisticsItems,
      ],
    ];

    return $data;
  }

}
