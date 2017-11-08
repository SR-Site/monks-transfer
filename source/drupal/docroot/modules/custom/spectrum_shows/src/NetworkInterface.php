<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining Network entities.
 *
 * @ingroup spectrum_shows
 */
interface NetworkInterface extends ContentEntityInterface {

  /**
   * Gets the Network name.
   *
   * @return string
   *   Station Name of the Network.
   */
  public function getStationName();

  /**
   * Sets the Network name.
   *
   * @param string $stationName
   *   The Station name.
   *
   * @return \Drupal\spectrum_shows\NetworkInterface
   *   The called Network entity.
   */
  public function setStationName($stationName);

  /**
   * Gets the Network number.
   *
   * @return int
   *   Station number of the Network.
   */
  public function getStationNumber();

  /**
   * Sets the Network number.
   *
   * @param int $stationNumber
   *   The Station number.
   *
   * @return \Drupal\spectrum_shows\NetworkInterface
   *   The called Network entity.
   */
  public function setStationNumber($stationNumber);

  /**
   * Gets the Network call sign.
   *
   * @return string
   *   Call sign of the Network.
   */
  public function getCallSign();

  /**
   * Sets the Network call sign.
   *
   * @param string $callSign
   *   The call sign.
   *
   * @return \Drupal\spectrum_shows\NetworkInterface
   *   The called Network entity.
   */
  public function setCallSign($callSign);

  /**
   * Gets the Network description.
   *
   * @return string
   *   Description of the Network.
   */
  public function getDescription();

  /**
   * Sets the Network Description.
   *
   * @param string $description
   *   The Description.
   *
   * @return \Drupal\spectrum_shows\NetworkInterface
   *   The called Network entity.
   */
  public function setDescription($description);

}
