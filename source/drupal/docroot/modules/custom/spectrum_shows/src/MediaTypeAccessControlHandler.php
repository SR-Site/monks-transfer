<?php

namespace Drupal\spectrum_shows;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the MediaType entity.
 *
 * @see \Drupal\spectrum_shows\Entity\MediaType.
 */
class MediaTypeAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\spectrum_shows\MediaTypeInterface $entity */
    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view media type entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit media type entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete media type entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add media type entities');
  }

}
