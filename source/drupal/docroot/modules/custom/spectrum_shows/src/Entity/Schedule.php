<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\spectrum_shows\ScheduleInterface;

/**
 * Defines the Schedule entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "schedule",
 *   label = @Translation("Schedule"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\ScheduleListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\ScheduleViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\ScheduleForm",
 *       "add" = "Drupal\spectrum_shows\Form\ScheduleForm",
 *       "edit" = "Drupal\spectrum_shows\Form\ScheduleForm",
 *       "delete" = "Drupal\spectrum_shows\Form\ScheduleDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\ScheduleAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "schedule",
 *   admin_permission = "administer schedule entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/schedule/{schedule}",
 *     "add-form" = "/admin/shows/schedule/add",
 *     "edit-form" = "/admin/shows/schedule/{schedule}/edit",
 *     "delete-form" = "/admin/shows/schedule/{schedule}/delete",
 *     "collection" = "/admin/shows/schedules",
 *   },
 * )
 */
class Schedule extends ContentEntityBase implements ScheduleInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('The title of the Schedule entity.'))
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

    $fields['subtitle'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Subtitle'))
      ->setDescription(t('The Subtitle of the Schedule entity.'))
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

    $fields['duration'] = BaseFieldDefinition::create('float')
      ->setLabel(t('Duration'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', FALSE)
      ->setDefaultValue('');

    $fields['start_time'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Start time'))
      ->setSettings([
        'datetime_type' => 'datetime',
      ])
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'datetime_default',
        'settings' => [
          'format_type' => 'medium',
        ],
        'weight' => 14,
      ])
      ->setDisplayOptions('form', [
        'type' => 'datetime_default',
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['live'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Live'))
      ->setDescription(t('The Live of the Schedule entity.'))
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

    $fields['network'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Network'))
      ->setDescription(t('The Network belongs to'))
      ->setSetting('target_type', 'network')
      ->setTranslatable(FALSE)
      ->setCardinality(1)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'author',
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'weight' => 5,
        'settings' => [
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'autocomplete_type' => 'tags',
          'placeholder' => '',
        ],
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['genre'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Genre'))
      ->setDescription(t('The Genre belongs to'))
      ->setSetting('target_type', 'genre')
      ->setTranslatable(FALSE)
      ->setCardinality(FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'author',
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'weight' => 5,
        'settings' => [
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'autocomplete_type' => 'tags',
          'placeholder' => '',
        ],
      ])
      ->setDisplayConfigurable('form', FALSE)
      ->setDisplayConfigurable('view', TRUE);

    return $fields;
  }

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
  public function getSubtitle() {
    return $this->get('subtitle')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setSubtitle($subtitle) {
    $this->set('subtitle', $subtitle);
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

  /**
   * {@inheritdoc}
   */
  public function getDuration() {
    return $this->get('duration')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setDuration($duration) {
    $this->set('duration', $duration);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getStartTime() {
    return $this->get('start_time')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setStartTime($startTime) {
    $this->set('start_time', $startTime);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getLive() {
    return $this->get('live')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setLive($live) {
    $this->set('live', $live);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getNetwork() {
    return $this->get('network')->entity;
  }

}
