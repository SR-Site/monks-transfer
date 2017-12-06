<?php

/**
 * @file
 * Drush commands.
 */

use Drupal\paragraphs\Entity\ParagraphsType;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;
use Drupal\image\Entity\ImageStyle;
use Drupal\paragraphs\Entity\Paragraph;

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
  $items['paragraph-migrate-heading'] = [
    'description' => dt('Migrate heading in paragraphs.'),
    'drush dependencies' => [],
    'aliases' => ['pmh'],
  ];
  $items['image-styles-create'] = [
    'description' => dt('Create image styles.'),
    'drush dependencies' => [],
    'aliases' => ['imsc'],
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

/**
 * Migrate paragraphs heading.
 */
function drush_spectrum_shows_paragraph_migrate_heading() {
  $paragraph_types = [
    'slideheromain',
    'blockherosecondary',
    'blocksmallheading',
  ];

  foreach ($paragraph_types as $paragraph_type) {
    $query = \Drupal::entityQuery('paragraph')
      ->condition('type', $paragraph_type);
    $results = $query->execute();
    $paragraphs = Paragraph::loadMultiple($results);
    foreach ($paragraphs as $paragraph) {
      /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
      $new_heading = $paragraph->get('field_new_heading')->getValue();
      if ($paragraph->get('field_heading')->value && empty($new_heading)) {
        $heading = $paragraph->get('field_heading')->value;
        $heading = text_summary(strip_tags($heading, '<strong><a><br>'), NULL, 240);
        $heading_paragraph = Paragraph::create(['type' => 'heading']);
        $heading_paragraph->set('field_heading_text', $heading);
        $heading_paragraph->save();
        $current[] = [
          'target_id' => $heading_paragraph->id(),
          'target_revision_id' => $heading_paragraph->getRevisionId(),
        ];
        $paragraph->set('field_new_heading', $current);
        $paragraph->save();
      }
    }
  }
}

/**
 * Create image styles.
 */
function drush_spectrum_shows_image_styles_create() {
  $image_styles = [
    '1920x1080',
    '1920x960',
    '1920x900',
    '1440x720',
    '1280x720',
    '1280x560',
    '1200x440',
    '1040x580',
    '750x1240',
    '750x750',
    '750x580',
    '960x1424',
    '640x1040',
    '520x520',
    '500x500',
    '480x480',
    '240x240',
  ];

  foreach ($image_styles as $image_style) {
    // Create image style.
    $style = ImageStyle::create([
      'name' => 'image_' . $image_style,
      'label' => 'Image ' . $image_style,
    ]);
    list($width, $height) = explode('x', $image_style);

    // Create effect.
    $configuration = [
      'uuid' => NULL,
      'id' => 'image_scale_and_crop',
      'weight' => 0,
      'data' => [
        'width' => $width,
        'height' => $height,
      ],
    ];
    $effect = \Drupal::service('plugin.manager.image.effect')
      ->createInstance($configuration['id'], $configuration);

    // Add it to the image style and save.
    $style->addImageEffect($effect->getConfiguration());
    $style->save();
  }

}
