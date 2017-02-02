<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockheromain_v1",
 *   label = @Translation("Paragraph: blockheromain"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockheromain",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroMainV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockHeroMain',
      "data" => $data + [
        "slides" => $this->getItems($entity->get('field_slides')),
      ],
    ];

    return $data;
  }

}
