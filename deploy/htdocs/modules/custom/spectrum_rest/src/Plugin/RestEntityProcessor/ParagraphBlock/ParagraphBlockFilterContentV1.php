<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_blockfiltercontent_v1",
 *   label = @Translation("Paragraph: blockfiltercontent"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "blockfiltercontent",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockFilterContentV1 extends SpectrumRestEntityProcessorBase {

  /**
   * URL for the search articles endpoint.
   */
  const ENDPOINT_SEARCH = '/api/v1/search/article';

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $filters = $this->getFilterOptions();

    $data = [
      "id" => 'filterContent',
      "data" => $data + [
        "loadMoreLabel" => $this->fieldProcessor->getFieldData($entity->get('field_load_more_label')),
        "filters" => $filters,
        "applyLabel" => $this->fieldProcessor->getFieldData($entity->get('field_apply_label')),
        "filterLabel" => $this->fieldProcessor->getFieldData($entity->get('field_filter_label')),
        "endpoint" => self::ENDPOINT_SEARCH,
      ],
    ];

    return $data;
  }

  /**
   * Get Filter's options.
   *
   * @return array
   */
  protected function getFilterOptions() {
    $filters = [];
    $vocabularies = ['category', 'document_type', 'market', 'platform'];

    foreach ($vocabularies as $index => $vid) {
      $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);

      $filter = [
        'type' => $index,
        'options' => [],
      ];

      foreach ($terms as $term) {
        $filter['options'][] = [
          'value' => $term->name,
          'label' => $term->name,
        ];
      }

      $filters[] = $filter;
    }

    return $filters;
  }

}
