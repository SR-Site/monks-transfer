<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocksmallinfo_v1",
 *   label = @Translation("Paragraph: blocksmallinfo"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocksmallinfo",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSmallInfoV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockSmallInfo',
      "data" => $data + [
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      ],
    ];

    return $data;
  }

}
