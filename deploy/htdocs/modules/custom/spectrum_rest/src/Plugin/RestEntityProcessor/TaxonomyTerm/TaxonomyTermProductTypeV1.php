<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\TaxonomyTerm;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_taxonomy_term_product_type_v1",
 *   label = @Translation("Taxonomy term: product type"),
 *   version = "v1",
 *   entity_type = "taxonomy_term",
 *   bundle = "product_type",
 *   view_mode = "default"
 * )
 */
class TaxonomyTermProductTypeV1 extends RestEntityProcessorBase {

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
