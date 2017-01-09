<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_teaser_v1",
 *   label = @Translation("Node: Article - Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "teaser"
 * )
 */
class NodeArticleTeaserV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "title" => $entity->label(),
      "excerpt" => $this->fieldProcessor->getFieldData($entity->field_excerpt),
      "image" => $this->fieldProcessor->getFieldData($entity->field_image),
      "tags" => $this->fieldProcessor->getFieldData($entity->field_tags),
    ];

    return $data;
  }

}
