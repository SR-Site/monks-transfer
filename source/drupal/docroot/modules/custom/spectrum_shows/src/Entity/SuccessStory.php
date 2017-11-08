<?php

namespace Drupal\spectrum_shows\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\link\LinkItemInterface;
use Drupal\spectrum_shows\SuccessStoryInterface;
use Drupal\user\UserInterface;

/**
 * Defines the Success story entity.
 *
 * @ingroup spectrum_shows
 *
 * @ContentEntityType(
 *   id = "success_story",
 *   label = @Translation("Success story"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\spectrum_shows\SuccessStoryListBuilder",
 *     "views_data" = "Drupal\spectrum_shows\Entity\SuccessStoryViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\spectrum_shows\Form\SuccessStoryForm",
 *       "add" = "Drupal\spectrum_shows\Form\SuccessStoryForm",
 *       "edit" = "Drupal\spectrum_shows\Form\SuccessStoryForm",
 *       "delete" = "Drupal\spectrum_shows\Form\SuccessStoryDeleteForm",
 *     },
 *     "access" = "Drupal\spectrum_shows\SuccessStoryAccessControlHandler",
 *     "route_provider" = {
 *        "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "success_story",
 *   admin_permission = "administer success story entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   links = {
 *     "canonical" = "/admin/shows/success_story/{success_story}",
 *     "add-form" = "/admin/shows/success_story/add",
 *     "edit-form" = "/admin/shows/success_story/{success_story}/edit",
 *     "delete-form" = "/admin/shows/success_story/{success_story}/delete",
 *     "collection" = "/admin/shows/success_stories",
 *   },
 * )
 */
class SuccessStory extends ContentEntityBase implements SuccessStoryInterface {

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
      ->setDescription(t('The title of the Success story entity.'))
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
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['highlight'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Highlight'))
      ->setDescription(t('The highlight of the Success story entity.'))
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
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['excerpt'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Excerpt'))
      ->setDescription(t('The excerpt of the Success story entity.'))
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
        'type' => 'text_textarea',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['url'] = BaseFieldDefinition::create('link')
      ->setLabel(t('Url'))
      ->setDescription(t('The Url.'))
      ->setSettings([
        'link_type' => LinkItemInterface::LINK_GENERIC,
        'title' => DRUPAL_DISABLED,
      ])
      ->setDisplayOptions('form', [
        'type' => 'link_default',
        'weight' => -4,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'default',
        'weight' => 0,
      ]);

    $fields['featured_image'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Featured Image'))
      ->setDescription(t('Featured Image.'))
      ->setCardinality(1)
      ->setSettings([
        'file_extensions' => 'png gif jpg jpeg',
        'uri_scheme' => 'public',
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

    $fields['body'] = BaseFieldDefinition::create('text_long')
      ->setLabel(t('Body'))
      ->setDescription(t('The body of the Success story entity.'))
      ->setDefaultValue('')
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

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    return $fields;
  }

}
