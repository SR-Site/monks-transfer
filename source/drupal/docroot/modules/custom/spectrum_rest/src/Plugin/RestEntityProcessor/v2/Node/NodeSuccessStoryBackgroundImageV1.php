<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_success_story_background_image_v1",
 *   label = @Translation("Node: Success Story - BackgroundImage"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "success_story",
 *   view_mode = "background_image"
 * )
 */
class NodeSuccessStoryBackgroundImageV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {

    $data = [
      'id' => 'heroTertiary',
      'data' => [
        'marginTop' => 2,
        'background' => $this->image($entity->get('field_background_image')),
      ],
    ];

    return $data;
  }

}
