<?php

/**
 * @file
 * Drush commands.
 */

use Drupal\paragraphs\Entity\ParagraphsType;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;

/**
 * Drush commands.
 *
 * This should later be ported to the drupal console,
 * but the console still has some problems.
 */
function spectrum_shows_drush_command() {
  $items['paragraph-types-create'] = [
    'description' => dt('Create custom paragraph types.'),
    'drush dependencies' => [],
    'aliases' => ['ptc'],
  ];
  return $items;
}

/**
 * Create paragraph types.
 */
function drush_spectrum_shows_paragraph_types_create() {
  $paragraph_types = [
    'Block Persona Selector Banner',
    'Block Product List',
    'Block Success Story Highlight',
    'Block Success Stories A',
    'Block Success Stories B',
    'Block Glossary B',
    'Block Multiple Images',
    'Block Find Your Audience',
    'Block Audience Statistics B',
    'Block Audience Top Programming',
    'Block Audience Product Top',
    'Block Blog Post B',
    'Block Show Detail',
    'Block Success Story Post',
    'Block Double Image',
    'Block Success Story Impact',
    'Block Video With Content C',
    'Block Twitter Feed',
    'Block Main Product Nav',
    'Block Large Video',
    'Block Hero Quinary',
    'Block Image With Content C',
  ];

  foreach ($paragraph_types as $label) {
    $id = strtolower($label);
    $id = str_replace(' ', '_', $id);
    $paragraph_type = ParagraphsType::load($id);
    if (!$paragraph_type instanceof ParagraphsType) {
      $paragraph_type = ParagraphsType::create([
        'id' => $id,
        'label' => $label,
      ]);
      $paragraph_type->save();

      // Create field_styles.
      $field_storage = FieldStorageConfig::loadByName('paragraph', 'field_styles')
        ->setSetting('target_type', 'paragraph');
      $field_storage->save();

      $field = FieldConfig::create([
        'field_storage' => $field_storage,
        'bundle' => $id,
        'label' => t('Styles'),
        'required' => 1,
      ]);
      $handler_settings['target_bundles']['styles'] = 'styles';
      $handler_settings['target_bundles_drag_drop']['styles']['enabled'] = 1;
      $field->setSetting('handler', 'default:paragraph');
      $field->setSetting('handler_settings', $handler_settings);
      $field->save();

      // Create field_scroll_id.
      $field_storage = FieldStorageConfig::loadByName('paragraph', 'field_scroll_id');
      $field_storage->save();

      $field = FieldConfig::create([
        'field_storage' => $field_storage,
        'bundle' => $id,
        'label' => t('Scroll ID'),
      ]);
      $field->save();

      /** @var \Drupal\Core\Entity\Entity\EntityFormDisplay $entity_form_display */
      $values = [
        'targetEntityType' => 'paragraph',
        'bundle' => $id,
        'mode' => 'default',
        'status' => TRUE,
      ];
      $entity_form_display = \Drupal::entityTypeManager()
        ->getStorage('entity_form_display')
        ->create($values);
      $entity_form_display->setComponent('field_styles', [
        'type' => 'entity_reference_paragraphs',
      ])
        ->setComponent('field_scroll_id', [
          'type' => 'string_textfield',
        ])
        ->save();
    }
  }
}
