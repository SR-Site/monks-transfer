<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of Genre entities.
 *
 * @ingroup spectrum_shows
 */
class MediaTypeListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Media Type ID');
    $header['name'] = $this->t('Name');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\spectrum_shows\Entity\Genre */
    $row['id'] = $entity->id();
    $row['name'] = new Link(
      $entity->label(),
      new Url(
        'entity.media_type.edit_form', [
          'media_type' => $entity->id(),
        ]
      )
    );
    return $row + parent::buildRow($entity);
  }

}
