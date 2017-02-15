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
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      ],
    ];

    return $data;
  }

}
