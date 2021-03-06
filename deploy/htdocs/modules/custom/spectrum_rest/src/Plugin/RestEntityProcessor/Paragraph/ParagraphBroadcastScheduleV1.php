<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_broadcastschedule_v1",
 *   label = @Translation("Paragraph: broadcastschedule"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "broadcastschedule",
 *   view_mode = "default"
 * )
 */
class ParagraphBroadcastScheduleV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "day" => $this->fieldProcessor->getFieldData($entity->field_date_day),
      "time" => $this->fieldProcessor->getFieldData($entity->field_time_string),
    ];

    return $data;
  }

}
