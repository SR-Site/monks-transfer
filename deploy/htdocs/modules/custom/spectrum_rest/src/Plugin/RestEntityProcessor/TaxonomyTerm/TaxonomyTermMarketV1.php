<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\spectrum_rest\Plugin\TagsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_market_v1",
 *   label = @Translation("Taxonomy term: Market"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "market",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermMarketV1 extends TagsRestEntityProcessorBase {}
