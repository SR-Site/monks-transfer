<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_product_page_detail_v1",
 *   label = @Translation("Node: Product page - Detail"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "product_page",
 *   view_mode = "detail"
 * )
 */
class NodeProductDetailV1 extends NodeShowTeaserModeV1 {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'HeroQuinary',
      'data' => [
        'heading' => $entity->label(),
        'paragraph' => $this->fieldProcessor->getFieldData($entity->get('body')),
        'background' => $this->image($entity->get('field_background_image')),
        'image' => $this->image($entity->get('field_image')),
      ],
    ];

    return $data;
  }

}
