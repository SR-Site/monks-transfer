<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\spectrum_shows\MediaTypeInterface;

/**
 * Defines the Genre entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "media_type",
 *   label = @Translation("Media Type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\MediaTypeListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\MediaTypeViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\MediaTypeForm",
 *       "add" = "Drupal\spectrum_shows\Form\MediaTypeForm",
 *       "edit" = "Drupal\spectrum_shows\Form\MediaTypeForm",
 *       "delete" = "Drupal\spectrum_shows\Form\MediaTypeDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\MediaTypeAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "media_type",
 *   admin_permission = "administer media type entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/media_type/{media_type}",
 *     "add-form" = "/admin/shows/media_type/add",
 *     "edit-form" = "/admin/shows/media_type/{media_type}/edit",
 *     "delete-form" = "/admin/shows/media_type/{media_type}/delete",
 *     "collection" = "/admin/shows/media_types",
 *   },
 * )
 */
class MediaType extends ContentEntityBase implements MediaTypeInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the MediaType entity.'))
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
