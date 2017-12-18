<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\AdvertisingItem;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_advertising_item_glossary_a_v1",
 *   label = @Translation("Advertising item: Glossary A"),
 *   version = "v1",
 *   entity_type = "advertising_item",
 *   bundle = "advertising_item",
 *   view_mode = "glossary_a"
 * )
 */
class AdvertisingItemGlossaryAV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "value" => $this->fieldProcessor->getFieldData($entity->get('body')),
      "label" => $entity->label(),
    ];

    return $data;
  }

}
