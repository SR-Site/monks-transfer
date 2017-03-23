<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_blogpost_v1",
 *   label = @Translation("Node: Article - Blog Post"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "blogpost"
 * )
 */
class NodeArticleBlogpostV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "social" => $this->getItems($entity->get('field_links')),
      "author" => $this->entityProcessor->getEntityData($entity->getRevisionAuthor(), 'v1'),
      "image" => $this->image($entity->get('field_image')),
      "tags" => $this->getTags($entity),
      "views" => 0,
      "time" => (int) $this->fieldProcessor->getFieldData($entity->get('field_read_time')),
      "date" => $this->dateFormatter->format($entity->getCreatedTime(), 'custom', 'm/d/Y'),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_content')),
      "subHeading" => $this->fieldProcessor->getFieldData($entity->get('field_subheading')),
      "heading" => $entity->label(),
      "theme" => $entity->get('field_theme')->value,
      "target" => \Drupal\Core\Url::fromRoute('entity.node.canonical', ['node' => $entity->id()], ['absolute' => 0])->toString(),
    ];

    return $data;
  }

}
