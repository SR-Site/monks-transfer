<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\RestEntityProcessor\Node\NodeArticleTeaserV1;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_product_page_product_item_v1",
 *   label = @Translation("Node: Product Page - Product Item"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "product_page",
 *   view_mode = "product_item"
 * )
 */
class NodeProductPageProductItemV1 extends NodeArticleTeaserV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      "image" => $this->image($entity->get('field_image')),
      "target" => $this->aliasManager->getAliasByPath('/' . $entity->toUrl()->getInternalPath()),
      "paragraph" => $this->fieldProcessor->getFieldData($entity->get('body')),
      "heading" => $entity->label(),
    ];

    return $data;
  }

}
