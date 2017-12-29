<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockmarketmap_v1",
 *   label = @Translation("Paragraph: blockmarketmap"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockmarketmap",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockMarketMapV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      "id" => 'marketMap',
      "data" => $data + [
        "notFoundMessage" => $this->fieldProcessor->getFieldData($entity->get('field_description')),
        "searchPlaceholder" => $this->fieldProcessor->getFieldData($entity->get('field_filter_label')),
        "searchLabel" => strip_tags($this->fieldProcessor->getFieldData($entity->get('field_heading'))),
        "service" => [
          "heading" => $this->fieldProcessor->getFieldData($entity->get('field_title')),
          "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
          "cta" => $this->fieldProcessor->getFieldData($entity->get('field_cta')),
        ],
      ],
    ];

    return $data;
  }

}
