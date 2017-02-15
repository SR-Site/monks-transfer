<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockinfo_v1",
 *   label = @Translation("Paragraph: blockinfo"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockinfo",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockInfoV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);
    $block_info = $this->fieldProcessor->getFieldData($entity->get('field_block_info'), ['view_mode' => 'teaser']);

    $data = [
      "id" => 'info',
      "data" => $data + ($block_info ?: []),
    ];

    return $data;
  }

}
