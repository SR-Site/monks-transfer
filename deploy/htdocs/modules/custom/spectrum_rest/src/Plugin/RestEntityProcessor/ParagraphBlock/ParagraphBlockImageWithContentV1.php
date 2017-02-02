<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockimagewithcontent_v1",
 *   label = @Translation("Paragraph: blockimagewithcontent"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockimagewithcontent",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageWithContentV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockImageWithContent',
      "data" => $data + [
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "background" => $this->image($entity->get('field_image')),
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
        "croppedImage" => $this->fieldProcessor->getFieldData($entity->get('field_cropped_image')),
        "alignment" => (int) $entity->get('field_alignment')->value,
      ],
    ];

    return $data;
  }

}
