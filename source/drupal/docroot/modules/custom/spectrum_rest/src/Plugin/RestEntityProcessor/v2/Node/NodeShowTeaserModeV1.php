<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

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
class NodeShowTeaserModeV1 extends SpectrumRestEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  protected function getItemData($entity) {
    $data = [
      'heading' => $entity->label(),
      'paragraph' => text_summary($this->fieldProcessor->getFieldData($entity->get('field_show_description')), NULL, 200),
      'target' => $entity->toUrl()->toString(),
      'image' => $this->image($entity->get('field_image')),
    ];

    // Get video.
    $video = $this->fieldProcessor->getFieldData($entity->get('field_show_videos'));
    if (!empty($video)) {
      $data['video'] = $video[0];
    }

    // Get time of next episode.
    $airTime = $this->getNextEpisodeTime($entity->get('field_show_schedules'));
    if (!empty($airTime)) {
      $data['subHeading'] = t(':date @ :time ET/PT*', [
        ':date' => $airTime['date'],
        ':time' => $airTime['time'],
      ]);
    }

    // @TODO: Reaches.
    $data['reaches'] = [];

    return $data;
  }

  /**
   * Get time of next episode.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $schedules
   *   Schedule field item list.
   *
   * @return array
   *   Week and time of episode.
   */
  protected function getNextEpisodeTime(FieldItemListInterface $schedules) {
    $newDate = [];
    foreach ($schedules as $schedule) {
      // @TODO: Check the first next episode. Waiting for real data.
      /** @var \Drupal\spectrum_shows\Entity\Schedule $scheduleEntity */
      $scheduleEntity = $schedule->entity;
      $airTime = $scheduleEntity->get('start_time')->value;
      $airTimeDateTime = new \DateTime($airTime);
      $airTimeDateTime->setTimezone(new \DateTimeZone('America/New_York'));
      $newDate = [
        'date' => $airTimeDateTime->format('l M dS'),
        'time' => $airTimeDateTime->format('gA'),
      ];
      break;
    }
    return $newDate;
  }

}
