<?php

namespace Drupal\spectrum_markets_map;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the MediaKitRequest entity.
 *
 * @see \Drupal\spectrum_markets_map\Entity\MediaKitRequest.
 */
class MediaKitRequestAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\spectrum_markets_map\MediaKitRequestInterface $entity */
    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view media kit request entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit media kit request entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete media kit request entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add media kit request entities');
  }

}
