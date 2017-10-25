<?php

namespace Drupal\spectrum_rest;

interface SpectrumContactInterface {

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

}
