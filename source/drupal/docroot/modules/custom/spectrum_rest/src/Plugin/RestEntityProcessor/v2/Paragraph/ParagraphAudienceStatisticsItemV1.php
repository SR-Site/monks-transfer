<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_audience_statistics_item_v1",
 *   label = @Translation("Paragraph: Audience Statistics Item"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "audience_statistics_item",
 *   view_mode = "default"
 * )
 */
class ParagraphAudienceStatisticsItemV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    // Get Core product message item.
    $data = [
      'label' => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      'value' => $this->fieldProcessor->getFieldData($entity->get('field_text_value')),
      'link' => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      'background' => $this->fieldProcessor->getFieldData($entity->get('field_background_image')),
    ];

    return $data;
  }

}
