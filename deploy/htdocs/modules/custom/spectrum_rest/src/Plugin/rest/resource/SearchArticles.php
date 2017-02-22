<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\mm_rest_search\Plugin\ResourceSearch;

/**
 * Provides a resource to search page nodes.
 *
 * @RestResource(
 *   id = "spectrum_rest_searcharticles_v1",
 *   version = "v1",
 *   index_name = "articles",
 *   view_mode = "search",
 *   version = "v1",
 *   label = @Translation("Spectrum rest Search Articles resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/search/article"
 *   }
 * )
 */
class SearchArticles extends ResourceSearch {

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
   */
  public function get() {

    $this->offsetResponse = parent::get();

    return $this->responseData();
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {
    // Rearrange response.
    $data = $this->offsetResponse->getData();
    $this->offsetResponse->setData([
      'blocks' => isset($data['results']) ? $data['results'] : [],
    ]);

    return $this->offsetResponse;
  }

}
