<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\link\LinkItemInterface;
use Drupal\spectrum_shows\AdvertisingItemInterface;

/**
 * Defines the Advertising item entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "advertising_item",
 *   label = @Translation("Advertising Item"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\AdvertisingItemListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\AdvertisingItemViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\AdvertisingItemForm",
 *       "add" = "Drupal\spectrum_shows\Form\AdvertisingItemForm",
 *       "edit" = "Drupal\spectrum_shows\Form\AdvertisingItemForm",
 *       "delete" = "Drupal\spectrum_shows\Form\AdvertisingItemDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\AdvertisingItemAccessControlHandler",
 *     "route_provider" = {
 *        "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "advertising_item",
 *   admin_permission = "administer advertising item entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/advertising_item/{advertising_item}",
 *     "add-form" = "/admin/shows/advertising_item/add",
 *     "edit-form" = "/admin/shows/advertising_item/{advertising_item}/edit",
 *     "delete-form" =
 *   "/admin/shows/advertising_item/{advertising_item}/delete",
 *     "collection" = "/admin/shows/advertising_items",
 *   },
 * )
 */
class AdvertisingItem extends ContentEntityBase implements AdvertisingItemInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public function getTitle() {
    return $this->get('title')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setTitle($title) {
    $this->set('title', $title);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('The title of the Advertising Item entity.'))
      ->setSettings([
        'max_length' => 255,
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

    $fields['body'] = BaseFieldDefinition::create('text_long')
      ->setLabel(t('Body'))
      ->setDescription(t('The body of the Advertising Item entity.'))
      ->setDefaultValue('')
      ->setRequired(TRUE)
      ->setDisplayOptions('form', [
        'type' => 'text_textarea',
        'weight' => -4,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'default',
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['category'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Category'))
      ->setSetting('target_type', 'taxonomy_term')
      ->setSetting('handler', 'default:taxonomy_term')
      ->setRequired(TRUE)
      ->setSetting('handler_settings',
        [
          'target_bundles' => [
            'advertising_category' => 'advertising_category',
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

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    return $fields;
  }

}
