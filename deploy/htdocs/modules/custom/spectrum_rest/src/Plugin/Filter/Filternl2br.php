<?php

namespace Drupal\spectrum_rest\Plugin\Filter;

use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Provides a filter to convert line breaks to <br />.
 *
 * @Filter(
 *   id = "filter_nl2br",
 *   title = @Translation("Convert line breaks into <code>&lt;br&gt;</code>"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE
 * )
 */
class Filternl2br extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    return new FilterProcessResult(nl2br($text));
  }

  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    return $this->t('Lines breaks turns into &lt;br /&gt; automatically.');
  }

}
