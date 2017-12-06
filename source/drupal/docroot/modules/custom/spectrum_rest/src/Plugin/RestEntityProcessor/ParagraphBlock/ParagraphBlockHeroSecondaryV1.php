<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockherosecondary_v1",
 *   label = @Translation("Paragraph: blockherosecondary"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockherosecondary",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroSecondaryV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity) + $this->getHeadingParagraphData($entity);

    $data = [
      "id" => 'heroSecondary',
      "data" => $data + [
        "backgroundVideo" => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        "background" => $this->image($entity->get('field_image')),
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "backgroundColor" => $this->fieldProcessor->getFieldData($entity->get('field_background_color')),
      ],
    ];

    return $data;
  }

}
