<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_article_​audience_product_top_v1",
 *   label = @Translation("Node: Article - ​Audience Product Top"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "product_page",
 *   view_mode = "audience_product_top"
 * )
 */
class NodeProductAudienceProductTopV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('body')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}