<?php

namespace Drupal\spectrum_markets_map;

use Drupal\spectrum_rest\SpectrumContactInterface;

interface SpectrumMediaKitPardotInterface {

  /**
   * @param $key
   * @return mixed
   * @throws \UnexpectedValueException
   */
  public function __get($key);

  /**
   * @param $key
   * @param $value
   * @return mixed
   * @throws \UnexpectedValueException
   */
  public function __set($key, $value);

  /**
   * Return all properties.
   *
   * @return array
   */
  public function getProperties();

  /**
   * @param $key
   * @param $value
   *
   * @return mixed
   */
  public function setProperty($key, $value);

}
