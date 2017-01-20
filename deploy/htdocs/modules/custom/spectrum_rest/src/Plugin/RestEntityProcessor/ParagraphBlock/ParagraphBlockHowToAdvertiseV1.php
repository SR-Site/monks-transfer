<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockhowtoadvertise_v1",
 *   label = @Translation("Paragraph: blockhowtoadvertise"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockhowtoadvertise",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHowToAdvertiseV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    // It have to be always an array.
    $steps = $this->fieldProcessor->getFieldData($entity->get('field_steps'));
    if (count($entity->get('field_steps')) == 1) {
      $steps = [$steps];
    }

    $data = [
      "id" => 'howToAdvertise',
      "data" => $data + [
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "steps" => $steps,
      ],
    ];

    return $data;
  }

}
