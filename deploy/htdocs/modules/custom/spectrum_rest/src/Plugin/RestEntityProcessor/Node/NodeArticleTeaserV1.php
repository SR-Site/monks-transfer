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
      "social" => $this->getItems($entity->get('field_links')),
      "author" => $this->entityProcessor->getEntityData($entity->getRevisionAuthor(), 'v1'),
      "tags" => $this->getTags($entity),
      "views" => 0,
      "time" => $this->fieldProcessor->getFieldData($entity->get('field_read_time')) . ":00",
      "date" => $this->dateFormatter->format($entity->getCreatedTime(), 'custom', 'd/m/Y'),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "subheading" => $this->fieldProcessor->getFieldData($entity->get('field_excerpt')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
