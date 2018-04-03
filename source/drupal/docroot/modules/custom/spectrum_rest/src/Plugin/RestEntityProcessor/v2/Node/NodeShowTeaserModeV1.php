<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\spectrum_rest\Plugin\ShowsRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_node_show_teaser_mode_v1",
 *   label = @Translation("Node: Show - Teaser"),
 *   version = "v1",
 *   entity_type = "node",
 *   bundle = "show",
 *   view_mode = "teaser_mode"
 * )
 */
class NodeShowTeaserModeV1 extends ShowsRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
      'heading' => $entity->label(),
      'paragraph' => text_summary($this->fieldProcessor->getFieldData($entity->get('field_show_description')), NULL, 200),
      'target' => $entity->toUrl()->toString(),
      'image' => $this->image($entity->get('field_image')),
      'imageStyle' => 'cover',
    ];

    // Get video.
    $video = $this->fieldProcessor->getFieldData($entity->get('field_show_videos'));
    if (!empty($video) && isset($video[0])) {
      $data['video'] = $video[0];
    }

    // Get time of next episode.
    $airTime = $this->showsUtility->getNextEpisodeTime($entity->get('field_show_schedules'), 'date');
    if (!empty($airTime)) {
      $data['subHeading'] = t(':date @ :time ET/PT*', [
        ':date' => $airTime['date'],
        ':time' => $airTime['time'],
      ]);
    }

    if ($entity->get('field_show_network')->entity) {
      $data['logo'] = $this->image($entity->get('field_show_network')->entity->get('image'));
    }

    // @TODO: Reaches.
    $data['reaches'] = [];

    return $data;
  }

}
