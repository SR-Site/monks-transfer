<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Recommend entities.
 *
 * @ingroup spectrum_shows
 */
interface RecommendInterface extends ContentEntityInterface {

  /**
   * Gets the Recommend title.
   *
   * @return string
   *   Station Name of the Network.
   */
  public function getTitle();

  /**
   * Sets the Recommend title.
   *
   * @param string $title
   *   The Recommend title.
   *
   * @return \Drupal\spectrum_shows\RecommendInterface
   *   The called Network entity.
   */
  public function setTitle($title);

}
