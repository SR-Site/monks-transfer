<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockpersonaselector_v1",
 *   label = @Translation("Paragraph: blockpersonaselector"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockpersonaselector",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPersonaSelectorV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'personaSelector',
      "data" => $data + [
        "personas" => $this->getItems($entity->get('field_personas')),
      ],
    ];

    return $data;
  }

}
