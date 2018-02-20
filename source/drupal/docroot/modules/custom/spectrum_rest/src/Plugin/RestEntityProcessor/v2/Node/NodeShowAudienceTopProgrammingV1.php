<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_audience_top_programming_v1",
 *   label = @Translation("Node: Show - Audience Top Programming"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "audience_top_programming"
 * )
 */
class NodeShowAudienceTopProgrammingV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $video = $this->fieldProcessor->getFieldData($entity->get('field_show_videos'));
    $background = [
      'normal' => $entity->get('field_image')->count() == 0 ? '/' . drupal_get_path('module', 'spectrum_rest') . '/images/1040x580.png' : $this->fieldProcessor->getFieldData($entity->get('field_image')),
      'small' => $entity->get('field_image')->count() == 0 ? '/' . drupal_get_path('module', 'spectrum_rest') . '/images/750x750.png' : $this->fieldProcessor->getFieldData($entity->get('field_image')),
      'alt' => $entity->label(),
    ];

    $data = [
      'heading' => $entity->label(),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_show_description')),
      'background' => $background,
      'network' => $entity->get('field_show_network')->entity ? $entity->get('field_show_network')->entity->label() : NULL,
      'playVideoLabel' => "Watch trailer",
      'video' => !empty($video) ? $video[0] : [],
    ];

    return $data;
  }

}
