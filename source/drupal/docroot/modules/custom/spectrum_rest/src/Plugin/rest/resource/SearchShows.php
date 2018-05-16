<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\mm_rest_search\Plugin\ResourceSearch;
use Drupal\search_api\Query\QueryInterface;

/**
 * Provides a resource to search page nodes.
 *
 * @RestResource(
 *   id = "spectrum_rest_searchshows_v1",
 *   version = "v1",
 *   index_name = "shows",
 *   view_mode = "search",
 *   version = "v1",
 *   label = @Translation("Spectrum rest Search Shows resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/search/show"
 *   }
 * )
 */
class SearchShows extends ResourceSearch {

  /**
   * Paginated response.
   *
   * @var \Drupal\mm_rest\Response\OffsetPaginatedResponse
   */
  private $offsetResponse;

  /**
   * Responds to entity GET requests with parameter.
   *
   * @return array
   *   Response.
   */
  public function get() {

    $this->offsetResponse = parent::get();

    return $this->responseData();
  }

  /**
   * {@inheritdoc}
   */
  protected function responseData() {
    // Rearrange response.
    $data = $this->offsetResponse->getData();
    $this->offsetResponse->setData([
      'blocks' => isset($data['results']) ? $data['results'] : [],
    ]);

    return $this->offsetResponse;
  }

  /**
   * {@inheritdoc}
   */
  public function sortItems(QueryInterface $query) {
    $query->sort('field_order_position', 'ASC');
    $query->sort('created', 'DESC');
  }

}
