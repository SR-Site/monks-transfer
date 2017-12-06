<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocksmallheading_v1",
 *   label = @Translation("Paragraph: blocksmallheading"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocksmallheading",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSmallHeadingV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'smallHeading',
      "data" => $data + [
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
      ],
    ];

    return $data;
  }

}
