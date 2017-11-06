<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\spectrum_shows\NetworkInterface;

/**
 * Defines the Network entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "network",
 *   label = @Translation("Network"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\NetworkListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\NetworkViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\NetworkForm",
 *       "add" = "Drupal\spectrum_shows\Form\NetworkForm",
 *       "edit" = "Drupal\spectrum_shows\Form\NetworkForm",
 *       "delete" = "Drupal\spectrum_shows\Form\NetworkDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\NetworkAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "network",
 *   admin_permission = "administer network entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "station_name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/network/{network}",
 *     "add-form" = "/admin/shows/network/add",
 *     "edit-form" = "/admin/shows/network/{network}/edit",
 *     "delete-form" = "/admin/shows/network/{network}/delete",
 *     "collection" = "/admin/shows/networks",
 *   },
 * )
 */
class Network extends ContentEntityBase implements NetworkInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['station_name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Station Name'))
      ->setDescription(t('The station name of the Network entity.'))
      ->setSettings([
        'max_length' => 500,
        'text_processing' => 0,
      ])
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', FALSE);

    $fields['station_number'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Station number'))
      ->setDescription(t('The inventory of the Product entity contains how many items are in stock.'))
      ->setTranslatable(FALSE)
      ->setReadOnly(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ]);

    $fields['call_sign'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Station Call sign'))
      ->setDescription(t('The station call sign of the Network entity.'))
      ->setSettings([
        'max_length' => 255,
        'text_processing' => 0,
      ])
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', FALSE);

    $fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'text_textarea',
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', FALSE)
      ->setDefaultValue('');

    $fields['image'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Image'))
      ->setDescription(t('Image with a type.'))
      ->setCardinality(1)
      ->setSettings([
        'file_extensions' => 'png gif jpg jpeg',
        'uri_scheme' => 'public'
      ])
      ->setTranslatable(FALSE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'default',
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'label' => 'hidden',
        'type' => 'image_image',
        'weight' => 0,
      ]);

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getStationName() {
    return $this->get('station_name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setStationName($stationName) {
    $this->set('station_name', $stationName);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getStationNumber() {
    return $this->get('station_number')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setStationNumber($stationNumber) {
    $this->set('station_number', $stationNumber);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCallSign() {
    return $this->get('call_sign')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCallSign($callSign) {
    $this->set('call_sign', $callSign);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return $this->get('description')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setDescription($description) {
    $this->set('description', $description);
    return $this;
  }

}
