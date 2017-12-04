<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Node;

use Drupal\Core\Field\FieldItemListInterface;
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
    ];

    // @TODO: Add age restrictions in backend..
    $data['ageRestriction'] = [
      'label' => 'Age Restriction',
      'image' => [
        'small' => 'https://via.placeholder.com/240x240',
        'normal' => 'https://via.placeholder.com/240x240',
        'alt' => 'Background image alt text',
      ],
    ];

    // Get next episode..
    $airTime = $this->getNextEpisodeTime($entity->get('field_show_schedules'));
    if (!empty($airTime)) {
      $data['airTime'] = [
        'label' => t('Air time'),
        'value' => t('New Episode :week at :time ET/PT', [
          ':week' => $airTime['week'],
          ':time' => $airTime['time'],
        ]),
      ];
    }

    if ($entity->get('field_show_network')->entity) {
      $data['network'] = [
        'label' => $entity->get('field_show_network')->entity->label(),
        'image' => $this->image($entity->get('field_show_network')->entity->get('image')),
      ];
    }

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
        'week' => $airTimeDateTime->format('l'),
        'time' => $airTimeDateTime->format('gA'),
      ];
      break;
    }
    return $newDate;
  }

}
