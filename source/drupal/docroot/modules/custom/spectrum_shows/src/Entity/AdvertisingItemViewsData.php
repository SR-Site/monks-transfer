<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Advertising Item entities.
 */
class AdvertisingItemViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['advertising_item']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Advertising Item'),
      'help' => $this->t('The Advertising Item ID.'),
    ];

    return $data;
  }

}
