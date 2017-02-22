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
      "id" => 'text',
      "data" => $data + [
        "html" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
      ],
    ];

    return $data;
  }

}
