<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocktext_v1",
 *   label = @Translation("Paragraph: blocktext"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocktext",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockTextV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'FreeText',
      "data" => $data + [
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
        "html" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        'small' => $this->fieldProcessor->getFieldData($entity->get('field_margin_small')),
      ],
    ];

    return $data;
  }

}
