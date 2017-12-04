<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_success_story_b_v1",
 *   label = @Translation("Node: Article - Success Story B"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "success_story_b"
 * )
 */
class NodeArticleSuccessStoryBV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "image" => $this->image($entity->get('field_image')),
      "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
