<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockaudiofragment_v1",
 *   label = @Translation("Paragraph: blockaudiofragment"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockaudiofragment",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAudioFragmentV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $file = $this->fieldProcessor->getFieldData($entity->get('field_file'));
    $file = isset($file['url']) ? $file['url']: NULL;

    $data = [
      "id" => 'blockAudioFragment',
      "data" => $data + [
        "file" => $file,
        "image" => $this->image($entity->get('field_image')),
        "description" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "name" => $this->fieldProcessor->getFieldData($entity->get('field_label')),
      ],
    ];

    return $data;
  }

}
