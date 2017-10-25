<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_showmetric_v1",
 *   label = @Translation("Paragraph: showmetric"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "showmetric",
 *   view_mode = "default"
 * )
 */
class ParagraphShowMetricV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "field_icon" => $entity->get('field_icon')->value,
      "field_key" => $this->fieldProcessor->getFieldData($entity->field_key),
      "field_title" => $this->fieldProcessor->getFieldData($entity->field_title),
    ];

    return $data;
  }

}
