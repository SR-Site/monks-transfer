<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;

/**
 * Defines a class to build a listing of Success story entities.
 *
 * @ingroup spectrum_shows
 */
class SuccessStoryListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Success story ID');
    $header['name'] = $this->t('Name');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\spectrum_shows\Entity\SuccessStory */
    $row['id'] = $entity->id();
    $row['name'] = Link::createFromRoute(
      $entity->label(),
      'entity.success_story.edit_form',
      ['success_story' => $entity->id()]
    );
    return $row + parent::buildRow($entity);
  }

}
