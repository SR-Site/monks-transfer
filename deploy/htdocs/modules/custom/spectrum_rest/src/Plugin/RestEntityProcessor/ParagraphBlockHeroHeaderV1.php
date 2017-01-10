<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockheroheader_v1",
 *   label = @Translation("Paragraph: blockheroheader"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockheroheader",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockHeroHeaderV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockHeroHeader',
      'data' => [
        'title' => $this->fieldProcessor->getFieldData($entity->field_title),
        'subtitle' => $this->fieldProcessor->getFieldData($entity->field_subtitle),
        'description' => $this->fieldProcessor->getFieldData($entity->field_description),
        'background_image' => $this->fieldProcessor->getFieldData($entity->field_image),
      ],
    ];

    return $data;
  }

}
