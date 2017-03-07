<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_search_v1",
 *   label = @Translation("Node: Article - Search"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "search"
 * )
 */
class NodeArticleSearchV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "id" => "articleTeaser",
      "data" => parent::getItemData($entity),
    ];

    $data["data"]["paragraph"] = $this->fieldProcessor->getFieldData($entity->get('field_excerpt'));

    return $data;
  }

}
