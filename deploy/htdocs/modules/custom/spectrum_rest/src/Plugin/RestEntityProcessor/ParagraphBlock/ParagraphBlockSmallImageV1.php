<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocksmallimage_v1",
 *   label = @Translation("Paragraph: blocksmallimage"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocksmallimage",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockSmallImageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'smallImage',
      "data" => $data + [
        "image" => $this->image($entity->get('field_image')),
        "alignment" => (int) $entity->get('field_alignment')->value,
      ],
    ];

    return $data;
  }

}
