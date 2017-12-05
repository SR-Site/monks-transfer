<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_filter_show_content_v1",
 *   label = @Translation("Paragraph: Block filter show content"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_filter_show_content",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockFilterShowContentV1 extends SpectrumRestEntityProcessorBase {

  /**
   * URL for the search articles endpoint.
   */
  const ENDPOINT_SEARCH = '/v1/search/show';

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = parent::getCommonData($entity);

    $filters = $this->getFilterOptions();

    $data = [
      'id' => 'filterContent',
      'data' => $data + [
        'filters' => $filters,
        'filterLabel' => $this->fieldProcessor->getFieldData($entity->get('field_filter_label')),
        'closeLabel' => $this->fieldProcessor->getFieldData($entity->get('field_close_label')),
        'endpoint' => self::ENDPOINT_SEARCH,
      ],
    ];

    return $data;
  }

  /**
   * Get Filter's options.
   *
   * @return array
   *   Filters array.
   *
   * @throws \Exception
   */
  protected function getFilterOptions() {
    $filters = [];

    // Get genres.
    $genreResults = \Drupal::entityTypeManager()
      ->getStorage('genre')
      ->loadMultiple();
    $genresOptions = [];
    foreach ($genreResults as $genreResult) {
      $genresOptions[] = [
        "value" => $genreResult->label(),
        "label" => $genreResult->label(),
      ];
    }
    $filters[] = [
      "type" => 0,
      "label" => "Genres",
      "options" => $genresOptions,
    ];

    // Get networks.
    $networkResults = \Drupal::entityTypeManager()
      ->getStorage('network')
      ->loadMultiple();
    $networkOptions = [];
    foreach ($networkResults as $networkResult) {
      $networkOptions[] = [
        "value" => $networkResult->label(),
        "label" => $networkResult->label(),
      ];
    }
    $filters[] = [
      "type" => 1,
      "label" => "Networks",
      "options" => $networkOptions,
    ];

    return $filters;
  }

}
