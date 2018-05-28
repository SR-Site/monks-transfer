<?php

namespace Drupal\spectrum_markets_map\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Category entities.
 */
class MediaKitRequestViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['media_kit_request']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Media Kit Request'),
      'help' => $this->t('The Media Kit Request ID.'),
    ];

    return $data;
  }

}
