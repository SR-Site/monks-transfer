<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Schedule entities.
 *
 * @ingroup spectrum_shows
 */
interface ScheduleInterface extends ContentEntityInterface {

  /**
   * Gets the Schedule title.
   *
   * @return string
   *   Title of the Schedule.
   */
  public function getTitle();

  /**
   * Sets the Schedule title.
   *
   * @param string $title
   *   The Schedule title.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setTitle($title);

  /**
   * Gets the Schedule subtitle.
   *
   * @return string
   *   Subtitle of the Network.
   */
  public function getSubtitle();

  /**
   * Sets the Schedule Subtitle.
   *
   * @param string $subtitle
   *   The Schedule Subtitle.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setSubtitle($subtitle);

  /**
   * Gets the Schedule Description.
   *
   * @return string
   *   Descembed of the Network.
   */
  public function getDescription();

  /**
   * Sets the Schedule Description.
   *
   * @param string $description
   *   The Schedule Description.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setDescription($description);

  /**
   * Gets the Schedule Duration.
   *
   * @return float
   *   Duration of the Schedule.
   */
  public function getDuration();

  /**
   * Sets the Schedule Duration.
   *
   * @param float $duration
   *   The Schedule Duration.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setDuration($duration);

  /**
   * Gets the Schedule StartTime.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime
   *   StartTime of the Schedule.
   */
  public function getStartTime();

  /**
   * Sets the Schedule StartTime.
   *
   * @param \Drupal\Core\Datetime\DrupalDateTime $startTime
   *   The Schedule StartTime.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setStartTime(DrupalDateTime $startTime);

  /**
   * Gets the Schedule Live.
   *
   * @return string
   *   Live of the Schedule.
   */
  public function getLive();

  /**
   * Sets the Schedule Live.
   *
   * @param string $live
   *   The Schedule Live.
   *
   * @return \Drupal\spectrum_shows\ScheduleInterface
   *   The called Schedule entity.
   */
  public function setLive($live);

  /**
   * Get the Network entity.
   *
   * @return \Drupal\spectrum_shows\NetworkInterface
   *   The called Schedule entity.
   */
  public function getNetwork();

}
