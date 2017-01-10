<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocklandingpagesmodules_v1",
 *   label = @Translation("Paragraph: blocklandingpagesmodules"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocklandingpagesmodules",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockLandingPagesModulesV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $blocks = $this->fieldProcessor->getFieldData($entity->field_story_blocks);

    // Story blocks needs to be always an array.
    if (count($entity->field_story_blocks) == 1) {
      $blocks = [$blocks];
    }

    $data = [
      'id' => 'BlockLandingPagesModules',
      'data' => [
        "blocks" => $blocks,
      ],
    ];

    return $data;
  }

}
