<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockpathtopurchase_v1",
 *   label = @Translation("Paragraph: blockpathtopurchase"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockpathtopurchase",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockPathToPurchaseV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'blockPathToPurchase',
      "data" => $data,
    ];

    return $data;
  }

}
