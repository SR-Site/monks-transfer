<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_detail_v1",
 *   label = @Translation("Node: Show - Detail"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "detail"
 * )
 */
class NodeShowDetailV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'heading' => $entity->label(),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_show_description')),
      "airTime" => [
        "label" => "Air time",
        "value" => "New Episodes Saturdays at 6PM ET/PT",
      ],
      "ageRestriction" => [
        "label" => "Age Restriction",
        "image" => [
          "small" => "https://via.placeholder.com/240x240",
          "normal" => "https://via.placeholder.com/240x240",
          "alt" => "Background image alt text",
        ],
      ],
    ];

    if ($entity->get('field_show_network')->entity) {
      $data['network'] = [
        'label' => $entity->get('field_show_network')->entity->label(),
        'image' => $this->image($entity->get('field_show_network')->entity->get('image')),
      ];
    }

    return $data;
  }

}
