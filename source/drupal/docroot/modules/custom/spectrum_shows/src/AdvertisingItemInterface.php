<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Advertising Item entities.
 *
 * @ingroup spectrum_shows
 */
interface AdvertisingItemInterface extends ContentEntityInterface {

  /**
   * Gets the Advertising Item title.
   *
   * @return string
   *   Station Name of the Advertising Item.
   */
  public function getTitle();

  /**
   * Sets the Advertising Item title.
   *
   * @param string $title
   *   The Advertising Item title.
   *
   * @return \Drupal\spectrum_shows\AdvertisingItemInterface
   *   The called Advertising Item entity.
   */
  public function setTitle($title);

}
