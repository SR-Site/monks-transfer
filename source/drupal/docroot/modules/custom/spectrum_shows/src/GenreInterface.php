<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Genre entities.
 *
 * @ingroup spectrum_shows
 */
interface GenreInterface extends ContentEntityInterface {

  /**
   * Gets the Genre name.
   *
   * @return string
   *   Name of the Genre.
   */
  public function getName();

  /**
   * Sets the Category name.
   *
   * @param string $name
   *   The Genre name.
   *
   * @return \Drupal\spectrum_shows\GenreInterface
   *   The called Genre entity.
   */
  public function setName($name);

}
