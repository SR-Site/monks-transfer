<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\mm_rest_search\Plugin\ResourceSearch;

/**
 * Provides a resource to search page nodes.
 *
 * @RestResource(
 *   id = "spectrum_rest_search_networks_v1",
 *   version = "v1",
 *   index_name = "networks",
 *   view_mode = "search",
 *   version = "v1",
 *   label = @Translation("Spectrum rest Search Shows resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/search/network"
 *   }
 * )
 */
class SearchNetworks extends SearchShows {

}
