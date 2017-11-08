<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Success story entities.
 */
class SuccessStoryViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.

    return $data;
  }

}
