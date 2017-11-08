<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Success story entities.
 *
 * @ingroup spectrum_shows
 */
interface SuccessStoryInterface extends ContentEntityInterface {

  /**
   * Gets the Success story title.
   *
   * @return string
   *   Name of the Success story.
   */
  public function getTitle();

  /**
   * Sets the Success story title.
   *
   * @param string $title
   *   The Success story title.
   *
   * @return \Drupal\spectrum_shows\SuccessStoryInterface
   *   The called Success story entity.
   */
  public function setTitle($title);

  /**
   * Gets the Success story creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Success story.
   */
  public function getCreatedTime();

  /**
   * Sets the Success story creation timestamp.
   *
   * @param int $timestamp
   *   The Success story creation timestamp.
   *
   * @return \Drupal\spectrum_shows\SuccessStoryInterface
   *   The called Success story entity.
   */
  public function setCreatedTime($timestamp);

}
