<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Category entities.
 */
class NetworkViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['network']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Network'),
      'help' => $this->t('The Network ID.'),
    ];

    return $data;
  }

}
