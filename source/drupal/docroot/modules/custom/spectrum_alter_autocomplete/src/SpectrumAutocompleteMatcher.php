<?php
/**
 * Created by PhpStorm.
 * User: mladen
 * Date: 5/24/18
 * Time: 12:43 PM
 */

namespace Drupal\spectrum_alter_autocomplete;

use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\Tags;
use Drupal\Core\Entity\EntityAutocompleteMatcher;

/**
 * Class SpectrumAutocompleteMatcher
 *
 * @package Drupal\spectrum_alter_autocomplete
 */
class SpectrumAutocompleteMatcher extends EntityAutocompleteMatcher {

  /**
   * {@inheritdoc}
   */
  public function getMatches($target_type, $selection_handler, $selection_settings, $string = '') {
    $matches = [];

    $options = $selection_settings + [
        'target_type' => $target_type,
        'handler' => $selection_handler,
      ];
    $handler = $this->selectionManager->getInstance($options);

    if (isset($string)) {
      // Get an array of matching entities.
      $match_operator = !empty($selection_settings['match_operator']) ? $selection_settings['match_operator'] : 'CONTAINS';
      $entity_labels = $handler->getReferenceableEntities($string, $match_operator, 10);

      // Loop through the entities and convert them into autocomplete output.
      foreach ($entity_labels as $values) {
        foreach ($values as $entity_id => $label) {
          $entity = \Drupal::entityTypeManager()->getStorage($target_type)->load($entity_id);
          $key = "$label ($entity_id)";
          // Strip things like starting/trailing white spaces, line breaks and
          // tags.
          $key = preg_replace('/\s\s+/', ' ', str_replace("\n", '', trim(Html::decodeEntities(strip_tags($key)))));
          // Names containing commas or quotes must be wrapped in quotes.
          $key = Tags::encode($key);
          if ($entity->getEntityTypeId() == 'schedule' && $entity->subtitle->value) {
            $label = $key . ' - ' . $entity->subtitle->value;
          }
          else {
            $label = $key;
          }
          $matches[] = ['value' => $key, 'label' => $label];
        }
      }
    }

    return $matches;
  }

}
