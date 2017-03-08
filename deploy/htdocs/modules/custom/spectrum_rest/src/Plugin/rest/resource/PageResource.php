<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\spectrum_rest\Plugin\EntityResourceBase;

/**
 * Provides a resource to get Page node data.
 *
 * @RestResource(
 *   id = "spectrum_rest_page_v1",
 *   version = "v1",
 *   entity_type = "node",
 *   entity_bundle = "page",
 *   label = @Translation("Spectrum rest Page resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/page/{slug}"
 *   }
 * )
 */
class PageResource extends EntityResourceBase {}
