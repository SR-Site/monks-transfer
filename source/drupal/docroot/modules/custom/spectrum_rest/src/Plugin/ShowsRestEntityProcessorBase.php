<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Datetime\DateFormatter;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Menu\MenuActiveTrailInterface;
use Drupal\Core\Menu\MenuLinkManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_rest\Plugin\RestFieldProcessorManager;
use Drupal\spectrum_rest\Utility\SpectrumShowsUtilityInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Common class for Shows blocks.
 *
 * @package Drupal\spectrum_rest\Plugin
 */
abstract class ShowsRestEntityProcessorBase extends SpectrumRestEntityProcessorBase {

  /**
   * @var \Drupal\spectrum_rest\Utility\SpectrumShowsUtilityInterface
   */
  protected $showsUtility;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, RestFieldProcessorManager $field_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, EntityRepositoryInterface $entity_repository, AliasManagerInterface $alias_manager, DateFormatter $date_formatter, MenuActiveTrailInterface $menu_active_trail, MenuLinkManagerInterface $menu_link_manager, ConfigFactoryInterface $configFactory, StateInterface $state, SpectrumShowsUtilityInterface $showsUtility) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $field_processor, $cacheable_metadata_collector, $entity_repository, $alias_manager, $date_formatter, $menu_active_trail, $menu_link_manager, $configFactory, $state);

    $this->showsUtility = $showsUtility;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('plugin.manager.mm_rest_entity_processor'),
      $container->get('plugin.manager.mm_rest_field_processor'),
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('entity.repository'),
      $container->get('path.alias_manager'),
      $container->get('date.formatter'),
      $container->get('menu.active_trail'),
      $container->get('plugin.manager.menu.link'),
      $container->get('config.factory'),
      $container->get('state'),
      $container->get('spectrum_rest.shows.utility')
    );
  }

}
