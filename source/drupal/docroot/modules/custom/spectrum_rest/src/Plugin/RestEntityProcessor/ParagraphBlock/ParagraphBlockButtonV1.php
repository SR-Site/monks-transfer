<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockbutton_v1",
 *   label = @Translation("Paragraph: blockbutton"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockbutton",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockButtonV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'button',
      "data" => $data + [
        "alignment" => (int) $entity->get('field_alignment')->value,
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
      ],
    ];

    return $data;
  }

}
