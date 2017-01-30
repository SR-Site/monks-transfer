<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockpagenotfound_v1",
 *   label = @Translation("Paragraph: blockpagenotfound"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockpagenotfound",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPageNotFoundV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockMapSecondary',
      "data" => $data + [
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "image" => $this->image($entity->get('field_image')),
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
        "errorCode" => (int) $this->fieldProcessor->getFieldData($entity->get('field_value')),
      ],
    ];

    return $data;
  }

}
