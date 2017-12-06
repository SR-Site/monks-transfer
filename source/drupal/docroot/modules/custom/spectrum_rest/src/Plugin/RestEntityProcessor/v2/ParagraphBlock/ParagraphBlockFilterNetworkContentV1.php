<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_filter_network_content_v1",
 *   label = @Translation("Paragraph: Block filter network content"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_filter_network_content",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockFilterNetworkContentV1 extends SpectrumRestEntityProcessorBase {

  /**
   * URL for the search articles endpoint.
   */
  const ENDPOINT_SEARCH = '/v1/search/network';

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $data = [
      'id' => 'filterContent',
      'data' => $data + [
        'filterLabel' => $this->fieldProcessor->getFieldData($entity->get('field_filter_label')),
        'closeLabel' => $this->fieldProcessor->getFieldData($entity->get('field_close_label')),
        'endpoint' => self::ENDPOINT_SEARCH,
      ],
    ];

    return $data;
  }

}
