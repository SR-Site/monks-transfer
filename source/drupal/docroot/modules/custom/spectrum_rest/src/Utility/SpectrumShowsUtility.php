<?php

namespace Drupal\spectrum_rest\Utility;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\node\Entity\Node;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;

/**
 * Class SpectrumShowsUtility
 *
 * @package Drupal\spectrum_rest\Utility
 */
class SpectrumShowsUtility implements SpectrumShowsUtilityInterface {

  /**
   * @var \Drupal\mm_rest\Plugin\RestEntityProcessorManager
   */
  protected $entityProcessor;

  /**
   * SpectrumShowsUtility constructor.
   *
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entityProcessor
   */
  public function __construct(RestEntityProcessorManager $entityProcessor) {
    $this->entityProcessor = $entityProcessor;
  }

  /**
   * {@inheritdoc}
   */
  public function getNextEpisodeTime(FieldItemListInterface $schedules, $type = 'date') {
    $newDate = [];
    foreach ($schedules as $schedule) {
      // @TODO: Check the first next episode. Waiting for real data.
      /** @var \Drupal\spectrum_shows\Entity\Schedule $scheduleEntity */
      if ($scheduleEntity = $schedule->entity) {
        $airTime = $scheduleEntity->get('start_time')->value;
        if (strtotime($scheduleEntity->get('start_time')->value) > time()) {
          $airTimeDateTime = new \DateTime($airTime);
          $date = $airTimeDateTime->format('l F dS');
          if ($type == 'week') {
            $date = $airTimeDateTime->format('l');
          }
          $newDate = [
            $type => $date,
            'time' => $airTimeDateTime->format('gA'),
          ];
          break;
        }
      }

    }
    return $newDate;
  }

  /**
   * {@inheritdoc}
   */
  public function getShowsByGenres(array $genres, $sid, $range = 8) {
    $shows = [];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'show')
      ->condition('status', 1)
      ->condition('nid', $sid, '!=')
      ->condition('field_show_genres.entity.id', $genres, 'IN')
      ->range(0, $range);
    $results = $query->execute();
    if (!empty($results)) {
      $showEntities = Node::loadMultiple($results);
      foreach ($showEntities as $showEntity) {
        $shows[] = $this->entityProcessor->getEntityData($showEntity, 'v1', ['view_mode' => 'program_module']);
      }
    }

    return $shows;
  }

}
