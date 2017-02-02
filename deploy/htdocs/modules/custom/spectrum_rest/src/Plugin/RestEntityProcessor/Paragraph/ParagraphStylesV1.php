<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_styles_v1",
 *   label = @Translation("Paragraph: styles"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "styles",
 *   view_mode = "default"
 * )
 */
class ParagraphStylesV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "overlap" => $this->fieldProcessor->getFieldData($entity->get('field_overlap')),
      "windowed" => $this->fieldProcessor->getFieldData($entity->get('field_windowed')),
      "marginTop" => (int) $this->fieldProcessor->getFieldData($entity->get('field_margin_top')),
    ];

    return $data;
  }

}
