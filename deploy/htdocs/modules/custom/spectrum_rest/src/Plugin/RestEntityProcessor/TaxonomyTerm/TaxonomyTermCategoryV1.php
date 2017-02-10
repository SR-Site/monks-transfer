<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\spectrum_rest\Plugin\TagsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_category_v1",
 *   label = @Translation("Taxonomy term: Category"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "category",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermCategoryV1 extends TagsRestEntityProcessorBase {}
