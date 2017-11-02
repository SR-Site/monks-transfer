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
function spectrum_rest_drush_command() {
  $items['prerender-queue-nodes'] = array(
    'description' => dt('Queue all nodes for a specific domain. You have to run this command passing the --user=1 because of the node grants inside domain module.'),
    'drush dependencies' => array(),
    'aliases' => array('pr-qn'),
  );
  return $items;
}

function drush_spectrum_rest_prerender_queue_nodes() {
  /** @var EntityTypeManagerInterface $entityTypeManager */
  $entityTypeManager = \Drupal::service('entity_type.manager');
  /** @var PrerenderService $prerenderService */
  $prerenderService = \Drupal::service('prerender.prerender');


  /** @var NodeInterface[] $nodes */
  $nodes = $entityTypeManager->getStorage('node')->loadByProperties([
    'status' => 1,
  ]);

  foreach ($nodes as $node) {
    $url = $node->toUrl();
    $uri = $url->toString();

    $prerenderedData = $prerenderService->getData($uri);
    $prerenderedData->target_uuid = $node->uuid();
    $prerenderedData->entity_type = 'node';
    $prerenderedData->langcode = $node->language()->getId();

    $prerenderedData->save();

    $prerenderService->queueData($prerenderedData, TRUE);
    drush_log(t('Added node @node_id to the queue', [
      '@node_id' => $node->id(),
    ]), LogLevel::OK);
  }
}