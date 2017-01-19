<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_tags_v1",
 *   label = @Translation("Taxonomy term: Tags"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "tags",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermTagsV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "id" => $entity->id(),
      "name" => $entity->label(),
    ];

    return $data;
  }

}
