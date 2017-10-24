<?php

namespace Drupal\spectrum_rest\Normalizer;

use Drupal\serialization\Normalizer\NormalizerBase;
use Drupal\spectrum_rest\SpectrumContact;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class SpectrumContactDenormalizer extends NormalizerBase implements DenormalizerInterface {

  /**
   * The interface or class that this Normalizer supports.
   *
   * @var array
   */
  protected $supportedInterfaceOrClass = array('Drupal\spectrum_rest\SpectrumContactInterface');

  /**
   * @inheritDoc
   */
  public function normalize($object, $format = null, array $context = array()) {
    // TODO: Implement normalize() method.
  }

  /**
   * @inheritDoc
   */
  public function denormalize($data, $class, $format = null, array $context = array()) {
    // TODO: add validation.
    return new SpectrumContact($data);
  }

}
