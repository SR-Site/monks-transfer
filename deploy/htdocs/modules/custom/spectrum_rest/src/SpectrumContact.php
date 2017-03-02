<?php

namespace Drupal\spectrum_rest;

class SpectrumContact implements SpectrumContactInterface {

  protected $properties;

  /**
   * ContactSerializer constructor.
   *
   * @param $data
   */
  public function __construct($data) {
    $this->properties = [
      'firstName' => NULL,
      'lastName' => NULL,
      'company' => NULL,
      'city' => NULL,
      'state' => NULL,
      'email' => NULL,
      'phone' => NULL,
      'zipCode' => NULL,
      'comments' => NULL,
    ];

    foreach ($data as $key => $value) {
      $this->{$key} = $value;
    }
  }

  /**
   * @param $key
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
   * @return mixed
   * @throws \UnexpectedValueException
   */
  public function __set($key, $value) {
    if (!array_key_exists($key, $this->properties)) {
      throw new \UnexpectedValueException("There is no $key property.");
    }

    return $this->properties[$key] = $value;
  }

}
