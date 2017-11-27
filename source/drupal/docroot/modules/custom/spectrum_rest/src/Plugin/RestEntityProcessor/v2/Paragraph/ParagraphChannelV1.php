<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_channel_v1",
 *   label = @Translation("Paragraph: Channel"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "channel",
 *   view_mode = "default"
 * )
 */
class ParagraphChannelV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get statistic.
    $statistics = $this->fieldProcessor->getFieldData($entity->get('field_channel_statistics'));
    $statisticsValues = [];
    foreach ($statistics as $statistic) {
      $statisticsValues[]['value'] = $statistic;
    }

    // Get channel item.
    $data = [
      'image' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph_image')),
      'heading' => $this->fieldProcessor->getFieldData($entity->get('field_main_heading')),
      'statistics' => $statisticsValues,
    ];

    return $data;
  }

}
