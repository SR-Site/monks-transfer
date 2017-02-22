<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmapsecondary_v1",
 *   label = @Translation("Paragraph: blockmapsecondary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmapsecondary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMapSecondaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'mapSecondary',
      "data" => $data + [
        "imageSequence" => [
          "image" => $this->image($entity->get('field_image')),
          "total" => (int) $this->fieldProcessor->getFieldData($entity->get('field_value')),
          "extension" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
        ],
        "sequenceBackground" => $this->image($entity->get('field_image2')),
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      ],
    ];

    return $data;
  }

}
