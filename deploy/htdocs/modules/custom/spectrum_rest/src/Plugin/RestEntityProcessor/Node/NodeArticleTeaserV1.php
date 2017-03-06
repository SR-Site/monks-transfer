<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class NodeArticleTeaserV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "theme" => (int) $entity->get('field_theme')->value,
      "tags" => $this->getTags($entity),
      "image" => $this->image($entity->get('field_image')),
      "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
