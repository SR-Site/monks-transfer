<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocklandingpagesmodulesb_v1",
 *   label = @Translation("Paragraph: blocklandingpagesmodulesb"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocklandingpagesmodulesb",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLandingPagesModulesBV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $blocks = $this->fieldProcessor->getFieldData($entity->field_paragraphs);

    // Story blocks needs to be always an array.
    if (count($entity->field_paragraphs) == 1) {
      $blocks = [$blocks];
    }

    $data = [
      'id' => 'BlockLandingPagesModulesB',
      'data' => [
        "blocks" => $blocks,
      ],
    ];

    return $data;
  }

}
