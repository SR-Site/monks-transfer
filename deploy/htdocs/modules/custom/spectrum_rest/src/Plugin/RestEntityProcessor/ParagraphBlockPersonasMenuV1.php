<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockpersonasmenu_v1",
 *   label = @Translation("Paragraph: blockpersonasmenu"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockpersonasmenu",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPersonasMenuV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockPersonasMenu',
      'data' => [
        "title" => $this->fieldProcessor->getFieldData($entity->field_title),
        "description" => $this->fieldProcessor->getFieldData($entity->field_description),
        "cta" => $this->fieldProcessor->getFieldData($entity->field_link),
        "buttons" => $this->fieldProcessor->getFieldData($entity->field_links),
      ],
    ];

    return $data;
  }

}
