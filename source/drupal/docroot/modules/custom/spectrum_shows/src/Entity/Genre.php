<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\spectrum_shows\GenreInterface;

/**
 * Defines the Genre entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "genre",
 *   label = @Translation("genre"),
 *   bundle_label = @Translation("Category type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\Core\Entity\EntityListbuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\GenreViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\GenreForm",
 *       "add" = "Drupal\spectrum_shows\GenreForm",
 *       "edit" = "Drupal\spectrum_shows\GenreForm",
 *       "delete" = "Drupal\spectrum_shows\Form\GenreDeleteForm",
 *     },
 *   },
 *   base_table = "genre",
 *   admin_permission = "administer genre entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/genre/{genre}",
 *     "add-form" = "/admin/shows/genre/add",
 *     "edit-form" = "/admin/shows/genre/{genre}/edit",
 *     "delete-form" = "/admin/shows/genre/{genre}/delete",
 *     "collection" = "/admin/shows/genres",
 *   },
 * )
 */
class Genre extends ContentEntityBase implements GenreInterface {

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

}
