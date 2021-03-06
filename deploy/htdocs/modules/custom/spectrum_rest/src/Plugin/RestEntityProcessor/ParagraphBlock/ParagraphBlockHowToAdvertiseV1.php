<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class ParagraphBlockHowToAdvertiseV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'howToAdvertise',
      "data" => $data + [
        "steps" => $this->getItems($entity->get('field_steps')),
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
      ],
    ];

    return $data;
  }

}
