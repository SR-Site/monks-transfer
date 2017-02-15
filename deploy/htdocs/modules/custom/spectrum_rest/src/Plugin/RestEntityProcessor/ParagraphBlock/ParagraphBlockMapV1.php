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

    $steps = [];
    foreach ($this->getItems($entity->get('field_steps_text')) as $item) {
      $steps[] = ['label' => $item];
    }

    $data = [
      "id" => 'map',
      "data" => $data + [
        "steps" => $steps,
        "imageSequence" => [
          "image" => $this->image($entity->get('field_image')),
          "total" => (int) $this->fieldProcessor->getFieldData($entity->get('field_value')),
          "extension" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
          "autoplay" => $this->fieldProcessor->getFieldData($entity->get('field_autoplay')),
        ],
      ],
    ];

    return $data;
  }

}
