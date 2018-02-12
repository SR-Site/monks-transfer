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

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'heroSecondary',
      "data" => $data + [
        "heading" => '',
        "backgroundVideo" => $this->fieldProcessor->getFieldData($entity->get('field_video')) ?: [],
        "background" => $this->image($entity->get('field_image')),
        "link" => $this->fieldProcessor->getFieldData($entity->get('field_link')),
        "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
        "backgroundColor" => $this->fieldProcessor->getFieldData($entity->get('field_background_color')),
      ],
    ];

    if($entity->hasField('field_primary_heading')){
      $data['data']['heading'] = $this->fieldProcessor->getFieldData($entity->get('field_primary_heading')->getValue());
    }

    return $data;
  }

}
