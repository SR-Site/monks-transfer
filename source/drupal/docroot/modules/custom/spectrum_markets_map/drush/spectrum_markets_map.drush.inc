<?php
/**
 * Created by PhpStorm.
 * User: jur
 * Date: 20/03/2017
 * Time: 16:05
 */

use Drupal\prerender\Entity\PrerenderedDataInterface;
use Drush\Log\LogLevel;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\prerender\PrerenderService;
use Drupal\node\NodeInterface;

/**
 * Drush commands.
 * This should later be ported to the drupal console,
 * but the console still has some problems.
 */
function spectrum_markets_map_drush_command() {
  $items['markets-add-credits'] = array(
    'description' => dt('Add credits to the markets maps.'),
    'drush dependencies' => array(),
    'aliases' => array('mp-ac'),
  );
  return $items;
}

/**
 * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
 * @throws \Drupal\Core\Entity\EntityStorageException
 */
function drush_spectrum_markets_map_markets_add_credits() {
  /** @var EntityTypeManagerInterface $entityTypeManager */
  $entityTypeManager = \Drupal::service('entity_type.manager');


  /** @var NodeInterface[] $nodes */
  $nodes = $entityTypeManager->getStorage('node')->loadByProperties([
    'status' => 1,
    'type' => 'market'
  ]);

  foreach ($nodes as $node) {

    $node->field_market_credits = [
      ['value' => 'Source:'],
      ['value' => 'Scarborough 2017 Release 2 Total (Oct 2016 - Sep 2017)'],
      ['value' => 'Nielsen 2017-18 UE Estimates & Persons Therein Report']
    ];
    $node->save();

    drush_log(t('Added credits to the market @node_label', [
      '@node_label' => $node->label(),
    ]), LogLevel::OK);
  }
}