<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of Recommend entities.
 *
 * @ingroup spectrum_shows
 */
class RecommendListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Recommend ID');
    $header['name'] = $this->t('Title');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\spectrum_shows\Entity\Recommend */
    $row['id'] = $entity->id();
    $row['name'] = new Link(
      $entity->label(),
      new Url(
        'entity.recommend.edit_form', [
          'recommend' => $entity->id(),
        ]
      )
    );
    return $row + parent::buildRow($entity);
  }

}
