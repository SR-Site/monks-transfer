<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_success_story_a_v1",
 *   label = @Translation("Node: Article - Success Story Highlight"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "success_story_a"
 * )
 */
class NodeArticleSuccessStoryAV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "heading" => $entity->label(),
      "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_excerpt')),
      'link' => [
        'label' => $entity->label(),
        'title' => $entity->label(),
        "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
        'type' => 0,
      ],
    ];

    return $data;
  }

}
