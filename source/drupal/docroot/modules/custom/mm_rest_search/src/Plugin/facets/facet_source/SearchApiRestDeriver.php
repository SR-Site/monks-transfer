<?php

namespace Drupal\mm_rest_search\Plugin\facets\facet_source;

use Drupal\rest\Plugin\Type\ResourcePluginManager;
use Drupal\facets\FacetSource\FacetSourceDeriverBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Derives a facet source plugin definition for every Search API display plugin.
 *
 * This facet source supports all search api display sources.
 *
 * @see \Drupal\facets\Plugin\facets\facet_source\SearchApi
 */
class SearchApiRestDeriver extends FacetSourceDeriverBase {

  /**
   * @var \Drupal\rest\Plugin\Type\ResourcePluginManager
   */
  protected $pluginManagerRest;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    /** @var static $deriver */
    $deriver = parent::create($container, $base_plugin_id);

    /** @var \Drupal\rest\Plugin\Type\ResourcePluginManager $plugin_manager_rest */
    $plugin_manager_rest = $container->get('plugin.manager.rest');
    $deriver->setPluginManagerRest($plugin_manager_rest);

    return $deriver;
  }

  /**
   * Sets the plugin manager rest.
   *
   * @param \Drupal\rest\Plugin\Type\ResourcePluginManager $plugin_manager_rest
   *   The plugin manager rest.
   *
   * @return $this
   */
  public function setPluginManagerRest(ResourcePluginManager $plugin_manager_rest) {
    $this->pluginManagerRest = $plugin_manager_rest;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    $base_plugin_id = $base_plugin_definition['id'];

    $plugins = $this->pluginManagerRest->getDefinitions();

    foreach ($plugins as $plugin) {
      if (isset($plugin['index_name']) && isset($plugin['uri_paths']['canonical'])) {
        $machine_name = $plugin['id'];
        $this->derivatives[$base_plugin_id][$machine_name] = [
            'id' => $base_plugin_id . ':' . $machine_name,
            'label' => $plugin['label'],
            'description' => $this->t('Provides a facet source.'),
            'index_name' => $plugin['index_name'],
            'resource_id' => $machine_name,
            'display_id' => 'search_' . $plugin['index_name'],
            'path' => $plugin['uri_paths']['canonical'],
          ] + $base_plugin_definition;
      }
    }

    return $this->derivatives[$base_plugin_id];
  }

}
