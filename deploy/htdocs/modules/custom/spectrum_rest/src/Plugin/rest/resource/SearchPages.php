<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\mm_rest_search\Plugin\ResourceSearch;

/**
 * Provides a resource to search page nodes.
 *
 * @RestResource(
 *   id = "spectrum_rest_searchpages_v1",
 *   version = "v1",
 *   index_name = "pages",
 *   view_mode = "search",
 *   version = "v1",
 *   label = @Translation("Spectrum rest Search Pages resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/search/page"
 *   }
 * )
 */
class SearchPages extends ResourceSearch {

  /**
   * Responds to entity GET requests with parameter.
   *
   * @return array
   */
  public function get() {

    $this->requestData = parent::get();

    return $this->responseData();
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {
    return $this->requestData;
  }

}
