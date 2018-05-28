<?php

namespace Drupal\spectrum_markets_map;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Genre entities.
 *
 * @ingroup spectrum_markets_map
 */
interface MediaKitRequestInterface extends ContentEntityInterface {

  /**
   * Denotes that the node is not promoted to the front page.
   */
  const NOT_SENT = 0;

  /**
   * Denotes that the node is promoted to the front page.
   */
  const SENT = 1;

  /**
   * Gets the MediaKitRequest name.
   *
   * @return string
   *   Name of the MediaKitRequest.
   */
  public function getName();

  /**
   * Sets the MediaKitRequest name.
   *
   * @param string $name
   *   The MediaKitRequest name.
   *
   * @return \Drupal\spectrum_markets_map\MediaKitRequestInterface
   *   The called MediaKitRequest entity.
   */
  public function setName($name);

  /**
   * Gets the MediaKitRequest email.
   *
   * @return string
   *   Email of the MediaKitRequest.
   */
  public function getEmail();

  /**
   * Sets the MediaKitRequest email.
   *
   * @param string $email
   *   The MediaKitRequest email.
   *
   * @return \Drupal\spectrum_markets_map\MediaKitRequestInterface
   *   The called MediaKitRequest entity.
   */
  public function setEmail($email);

  /**
   * Returns the MediaKit sent status.
   *
   * @return bool
   *   TRUE if the node is promoted.
   */
  public function isSent();

  /**
   * Set the status of sent MediaKit.
   * @param $sent
   *
   * @return \Drupal\spectrum_markets_map\MediaKitRequestInterface
   *   The called MediaKitRequest entity.
   */
  public function setSent($sent);
}
