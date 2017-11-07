<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Schedule entities.
 */
class ScheduleViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['schedule']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Schedule'),
      'help' => $this->t('The Schedule ID.'),
    ];

    return $data;
  }

}
