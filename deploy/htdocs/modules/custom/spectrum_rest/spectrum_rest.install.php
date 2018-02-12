<?php

/**
 * Implements hook install.
 */
function spectrum_rest_install(){

}

/**
 * Implements hook_update.
 */
function spectrum_rest_8001_update(){

  $connection = \Drupal\Core\Database\Database::getConnection();

  $items = $connection->select('paragraphs_item', 'p')
    ->fields('id', ['id'])
    ->condition('type', 'blockherosecondary');
  $items = $items->execute()->fetchCol();

  if(!empty($items)){
    foreach($items as $item) {

      if(is_numeric($item)) {
        $storage = \Drupal::entityTypeManager()->getStorage('paragraph');

        /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
        $paragraph = $storage->load($item);

        if(!empty($item) && $paragraph->hasField('field_heading') && $paragraph->hasField('field_primary_heading')){

          $oldValue = $paragraph->get('field_heading')->getValue();

          if(!empty($oldValue)){
            $paragraph->set('field_primary_heading', $oldValue);
            $paragraph->save();
          }
        }
      }
    }
  }
}