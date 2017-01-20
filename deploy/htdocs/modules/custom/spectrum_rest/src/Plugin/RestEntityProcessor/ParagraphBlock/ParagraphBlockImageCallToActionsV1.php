<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockimagecalltoactions_v1",
 *   label = @Translation("Paragraph: blockimagecalltoactions"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockimagecalltoactions",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockImageCallToActionsV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    // It have to be always an array.
    $items = $this->fieldProcessor->getFieldData($entity->get('field_calltoactions'));
    if (count($entity->get('field_calltoactions')) == 1) {
      $items = [$items];
    }

    $data = [
      "id" => 'imageCallToActions',
      "data" => $data + [
        "callToActions" => $items,
      ],
    ];

    return $data;
  }

}
