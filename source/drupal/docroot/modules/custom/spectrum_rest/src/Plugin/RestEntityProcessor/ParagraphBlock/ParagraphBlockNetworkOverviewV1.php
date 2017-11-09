<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blocknetworkoverview_v1",
 *   label = @Translation("Paragraph: blocknetworkoverview"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blocknetworkoverview",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockNetworkOverviewV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'networkOverview',
      "data" => $data + [
        'heading' => $this->fieldProcessor->getFieldData($entity->get('field_main_heading')),
        "items" => $this->getItems($entity->get('field_items')),
      ],
    ];

    return $data;
  }

}
