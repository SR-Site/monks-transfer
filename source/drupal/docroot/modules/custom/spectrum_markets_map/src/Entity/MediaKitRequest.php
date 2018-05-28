<?php

namespace Drupal\spectrum_markets_map\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\spectrum_markets_map\MediaKitRequestInterface;

/**
 * Defines the MediaKitRequest entity.
 *
 * @ingroup spectrum_markets_map
 *
 * @ContentEntityType(
 *   id = "media_kit_request",
 *   label = @Translation("MediaKit Request"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_markets_map\MediaKitRequestListBuilder",
 *     "views_data" = "Drupal\spectrum_markets_map\Entity\MediaKitRequestViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_markets_map\Form\MediaKitRequestForm",
 *       "add" = "Drupal\spectrum_markets_map\Form\MediaKitRequestForm",
 *       "edit" = "Drupal\spectrum_markets_map\Form\MediaKitRequestForm",
 *       "delete" = "Drupal\spectrum_markets_map\Form\MediaKitRequestDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_markets_map\MediaKitRequestAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "media_kit_request",
 *   admin_permission = "administer media kit request entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/media-kit-request/{media_kit_request}",
 *     "add-form" = "/admin/media-kit-request/add",
 *     "edit-form" = "/admin/media-kit-request/{media_kit_request}/edit",
 *     "delete-form" = "/admin/media-kit-request/{media_kit_request}/delete",
 *     "collection" = "/admin/media-kit-requests",
 *   },
 * )
 */
class MediaKitRequest extends ContentEntityBase implements MediaKitRequestInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the Genre entity.'))
      ->setSettings([
        'max_length' => 500,
        'text_processing' => 0,
      ])
      ->setDefaultValue('')
      ->setRequired(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['email'] = BaseFieldDefinition::create('email')
      ->setLabel(t('Email'))
      ->setDescription(t('The email of this user.'))
      ->setDefaultValue('')
      ->setRequired(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'email_default',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['market'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Market'))
      ->setSetting('target_type', 'node')
      ->setSetting('handler', 'default:node')
      ->setRequired(TRUE)
      ->setSetting('handler_settings',
        [
          'target_bundles' => [
            'market' => 'market',
          ],
        ])
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'author',
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'type' => 'options_select',
        'weight' => 3,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['sent'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('MediaKit has been sent'))
      ->setDefaultValue(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
        'settings' => [
          'display_label' => TRUE,
        ],
        'weight' => 15,
      ])
      ->setDisplayConfigurable('form', TRUE);

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getEmail() {
    return $this->get('email')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setEmail($email) {
    $this->set('email', $email);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function isSent() {
    return (bool) $this->get('sent')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setSent($sent) {
    $this->set('sent', $sent ? MediaKitRequestInterface::SENT : MediaKitRequestInterface::NOT_SENT);
    return $this;
  }

}
