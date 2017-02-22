<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class ParagraphBlockImageCallToActionsV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'imageCallToActions',
      "data" => $data + [
        "callToActions" => $this->getItems($entity->get('field_calltoactions')),
      ],
    ];

    return $data;
  }

}
