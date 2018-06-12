<?php

namespace Drupal\spectrum_markets_map\Normalizer;

use Drupal\serialization\Normalizer\NormalizerBase;
use Drupal\spectrum_markets_map\SpectrumMediaKitPardot;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class SpectrumMediaKitDenormalizer extends NormalizerBase implements DenormalizerInterface {

  /**
   * The interface or class that this Normalizer supports.
   *
   * @var array
   */
  protected $supportedInterfaceOrClass = array('Drupal\spectrum_markets_map\SpectrumMediaKitPardotInterface');

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
    return new SpectrumMediaKitPardot($data);
  }

}
