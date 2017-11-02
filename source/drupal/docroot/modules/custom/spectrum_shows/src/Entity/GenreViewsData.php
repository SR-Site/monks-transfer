<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Category entities.
 */
class GenreViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['genre']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Genre'),
      'help' => $this->t('The Genre ID.'),
    ];

    return $data;
  }

}
