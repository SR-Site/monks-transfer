<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_rest\Plugin\RestBaseParagraphBlock;

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
class NodeArticleTeaserV1 extends RestBaseParagraphBlock {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      "heading" => $entity->label(),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "image" => $this->image($entity->get('field_image')),
      "tags" => $this->fieldProcessor->getFieldData($entity->get('field_tags')),
    ];

    return $data;
  }

}
