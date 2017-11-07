<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Recommend entities.
 */
class RecommendViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['recommend']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Recommend'),
      'help' => $this->t('The Recommend ID.'),
    ];

    return $data;
  }

}
