<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\spectrum_rest\Plugin\TagsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_thought_leadership_v1",
 *   label = @Translation("Taxonomy term: ThoughtLeadership"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "thought_leadership",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermThoughtLeadershipV1 extends TagsRestEntityProcessorBase {}
