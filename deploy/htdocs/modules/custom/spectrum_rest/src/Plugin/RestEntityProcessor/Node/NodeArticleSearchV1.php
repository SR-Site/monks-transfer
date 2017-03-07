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
      "theme" => (int) $entity->get('field_theme')->value,
      "tags" => $this->getTags($entity),
      "image" => $this->image($entity->get('field_image')),
      "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_excerpt')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
