<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockanimatedmapcontent_v1",
 *   label = @Translation("Paragraph: blockanimatedmapcontent"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockanimatedmapcontent",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockAnimatedMapContentV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockAnimatedMapContent',
      'data' => [
        'title' => $this->fieldProcessor->getFieldData($entity->field_title),
        'description' => $this->fieldProcessor->getFieldData($entity->field_description),
        'cta' => $this->fieldProcessor->getFieldData($entity->field_link),
      ],
    ];

    return $data;
  }

}
