<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\spectrum_rest\Plugin\TagsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_document_type_v1",
 *   label = @Translation("Taxonomy term: Document Type"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "document_type",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermDocumentTypeV1 extends TagsRestEntityProcessorBase {}
