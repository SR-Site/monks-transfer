<?php

namespace Drupal\spectrum_markets_map;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of MediaKitRequest entities.
 *
 * @ingroup spectrum_markets_map
 */
class MediaKitRequestListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('MediaKit Request ID');
    $header['name'] = $this->t('Name');
    $header['email'] = $this->t('Email');
    $header['market'] = $this->t('Market');
    $header['sent'] = $this->t('Is sent');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\spectrum_markets_map\Entity\MediaKitRequest */
    $row['id'] = $entity->id();
    $row['name'] = new Link(
      $entity->label(),
      new Url(
        'entity.media_kit_request.edit_form', [
          'media_kit_request' => $entity->id(),
        ]
      )
    );
    $row['email'] = $entity->getEmail();
    $row['market'] = $entity->market->entity->label();
    $row['sent'] = $entity->isSent() ? t('Sent') : t('Not sent');
    return $row + parent::buildRow($entity);
  }

}
