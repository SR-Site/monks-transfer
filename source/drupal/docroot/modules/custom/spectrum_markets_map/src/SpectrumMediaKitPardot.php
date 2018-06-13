<?php

namespace Drupal\spectrum_markets_map;

/**
 * Class SpectrumMediaKitPardot
 *
 * @package Drupal\spectrum_markets_map
 */
class SpectrumMediaKitPardot implements SpectrumMediaKitPardotInterface {

  protected $properties;

  /**
   * ContactSerializer constructor.
   *
   * @param $data
   */
  public function __construct($data) {
    $this->properties = [
      'firstname' => NULL,
      'lastname' => NULL,
      'email' => NULL,
      'zipcode' => NULL,
      'websiteMediaKitDownloaded' => NULL,
    ];

    foreach ($data as $key => $value) {
      $this->{$key} = $value;
    }
  }

  /**
   * @param $key
   *
   * @return mixed
   * @throws \UnexpectedValueException
   */
  public function __get($key) {
    if (!array_key_exists($key, $this->properties)) {
      throw new \UnexpectedValueException("There is no $key property.");
    }

    return $this->properties[$key];
  }

  /**
   * @param $key
   * @param $value
   *
   * @return mixed
   * @throws \UnexpectedValueException
   */
  public function __set($key, $value) {
    if (!array_key_exists($key, $this->properties)) {
      throw new \UnexpectedValueException("There is no $key property.");
    }

    return $this->properties[$key] = $value;
  }

  /**
   * Return all properties.
   *
   * @return array
   */
  public function getProperties() {
    return $this->properties;
  }

}
