<?php

namespace Drupal\spectrum_rest\Utility;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Interface SpectrumShowsUtilityInterface
 *
 * @package Drupal\spectrum_rest\Utility
 */
interface SpectrumShowsUtilityInterface {

  /**
   * Get time of the next episode.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $schedules
   *   Schedule field item list.
   * @param string $type
   *   Type of date. It can be date or week.
   *
   * @return array
   *   Week and time of episode.
   */
  public function getNextEpisodeTime(FieldItemListInterface $schedules, $type = 'date');

  /**
   * Get shows by genre.
   *
   * @param array $genres
   *   Genre IDs array.
   * @param int $sid
   *   Show ID.
   * @param int $range
   *   Range.
   *
   * @return array|mixed
   *   Array of shows.
   *
   * @throws \Exception
   */
  public function getShowsByGenres(array $genres, $sid, $range = 8);

}
