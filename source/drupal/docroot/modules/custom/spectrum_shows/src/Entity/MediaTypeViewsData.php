<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Category entities.
 */
class MediaTypeViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['media_type']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Media Type'),
      'help' => $this->t('The Media Type ID.'),
    ];

    return $data;
  }

}
