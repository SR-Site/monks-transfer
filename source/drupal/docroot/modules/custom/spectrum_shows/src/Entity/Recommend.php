<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\entity_browser\Plugin\EntityBrowser\WidgetValidation\Cardinality;
use Drupal\spectrum_shows\NetworkInterface;
use Drupal\spectrum_shows\RecommendInterface;

/**
 * Defines the Recommend entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "recommend",
 *   label = @Translation("Recommend"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\RecommendListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\RecommendViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\RecommendForm",
 *       "add" = "Drupal\spectrum_shows\Form\RecommendForm",
 *       "edit" = "Drupal\spectrum_shows\Form\RecommendForm",
 *       "delete" = "Drupal\spectrum_shows\Form\RecommendDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\RecommendAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "recommend",
 *   admin_permission = "administer recommend entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/recommend/{recommend}",
 *     "add-form" = "/admin/shows/recommend/add",
 *     "edit-form" = "/admin/shows/recommend/{recommend}/edit",
 *     "delete-form" = "/admin/shows/recommend/{recommend}/delete",
 *     "collection" = "/admin/shows/recommends",
 *   },
 * )
 */
class Recommend extends ContentEntityBase implements RecommendInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('The Title of the Network entity.'))
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

    $fields['image_100'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Image 100'))
      ->setDescription(t('Image with a width of 100px.'))
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

    $fields['image_300'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Image 300'))
      ->setDescription(t('Image with a width of 300px.'))
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

    $fields['image_600'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Image 600'))
      ->setDescription(t('Image with a width of 600px.'))
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

}
