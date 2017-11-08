<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining MediaType entities.
 *
 * @ingroup spectrum_shows
 */
interface MediaTypeInterface extends ContentEntityInterface {

  /**
   * Gets the MediaType name.
   *
   * @return string
   *   Name of the MediaType.
   */
  public function getName();

  /**
   * Sets the MediaType name.
   *
   * @param string $name
   *   The MediaType name.
   *
   * @return \Drupal\spectrum_shows\MediaTypeInterface
   *   The called MediaType entity.
   */
  public function setName($name);

}
