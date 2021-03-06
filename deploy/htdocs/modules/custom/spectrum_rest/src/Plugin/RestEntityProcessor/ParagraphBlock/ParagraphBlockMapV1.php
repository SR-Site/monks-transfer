<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmap_v1",
 *   label = @Translation("Paragraph: blockmap"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmap",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMapV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'map',
      "data" => $data + [
        "steps" => $this->getItems($entity->get('field_steps_map')),
        "sequenceBackground" => $this->image($entity->get('field_image2')),
        "imageSequence" => [
          "image" => $this->image($entity->get('field_image')),
          "total" => (int) $this->fieldProcessor->getFieldData($entity->get('field_value')),
          "extension" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
        ],
      ],
    ];

    return $data;
  }

}
