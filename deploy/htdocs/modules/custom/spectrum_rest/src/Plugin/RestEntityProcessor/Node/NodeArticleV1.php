<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\user\Entity\User;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_v1",
 *   label = @Translation("Node: Article"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "article",
 *   view_mode = "default"
 * )
 */
class NodeArticleV1 extends RestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    /** @var \Drupal\Core\Entity\ContentEntityInterface $author */
    $author = User::load($entity->getOwnerId());

    $data = [
      "title" => $entity->label(),
      "author" => [
        "name" => $author->label(),
        "title" => $this->fieldProcessor->getFieldData($author->field_title),
        "avatar" => $this->fieldProcessor->getFieldData($author->user_picture),
      ],
      "image" => $this->fieldProcessor->getFieldData($entity->field_image),
      "read_time" => $this->fieldProcessor->getFieldData($entity->field_read_time),
      "tags" => $this->fieldProcessor->getFieldData($entity->field_tags),
      "content" => $this->fieldProcessor->getFieldData($entity->field_content),
    ];

    return $data;
  }

}
