<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\spectrum_rest\Plugin\TagsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_platform_v1",
 *   label = @Translation("Taxonomy term: Platform"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "platform",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermPlatformV1 extends TagsRestEntityProcessorBase {}
