<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockinformativeanimatingmap_v1",
 *   label = @Translation("Paragraph: blockinformativeanimatingmap"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockinformativeanimatingmap",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockInformativeAnimatingMapV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'BlockInformativeAnimatingMap',
      'data' => [
        'slides' => $this->fieldProcessor->getFieldData($entity->field_paragraphs),
      ],
    ];

    return $data;
  }

}
