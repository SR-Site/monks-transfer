<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_statistic_v1",
 *   label = @Translation("Paragraph: statistic"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "statistic",
 *   view_mode = "default"
 * )
 */
class ParagraphStatisticV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      "stats" => $this->getItems($entity->get('field_stats')),
    ];

    return $data;
  }

}
