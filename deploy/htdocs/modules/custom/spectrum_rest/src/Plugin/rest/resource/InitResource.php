<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Access\CsrfTokenGenerator;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Access\AccessResultAllowed;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Menu\MenuLinkTreeElement;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Language\Language;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\ResourceBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a resource to get data for the application init resource.
 *
 * @RestResource(
 *   id = "spin_rest_init_v1",
 *   version = "v1",
 *   label = @Translation("Init endpoint"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/init",
 *   }
 * )
 */
class InitResource extends ResourceBase {

  /**
   * Internal menu link.
   */
  const MENU_LINK_INTERNAL = 0;

  /**
   * External menu link.
   */
  const MENU_LINK_EXTERNAL = 1;

  /**
   * Menu Tree Link service.
   *
   * @var \Drupal\Core\Menu\MenuLinkTreeInterface
   */
  protected $menuLinkTree;

  /**
   * @var CacheableMetadata
   */
  protected $cacheableMetadata;

  /**
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * CSRF Token service.
   *
   * @var \Drupal\Core\Access\CsrfTokenGenerator
   */
  protected $csrfToken;

  /**
   * The Path AliasManager service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $pathAliasManager;

  /**
   * InitResource constructor.
   *
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param array $serializer_formats
   * @param \Psr\Log\LoggerInterface $logger
   * @param \Symfony\Component\HttpFoundation\Request $request
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   * @param \Drupal\Core\Menu\MenuLinkTreeInterface $menu_link_tree
   * @param \Drupal\Core\State\StateInterface $state
   * @param \Drupal\Core\Access\CsrfTokenGenerator $csrf_token
   * @param \Drupal\Core\Path\AliasManagerInterface $path_alias_manager
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, MenuLinkTreeInterface $menu_link_tree, StateInterface $state, CsrfTokenGenerator $csrf_token, AliasManagerInterface $path_alias_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);

    $this->menuLinkTree = $menu_link_tree;
    $this->state = $state;
    $this->csrfToken = $csrf_token;
    $this->pathAliasManager = $path_alias_manager;
  }

  /**
   * @inheritDoc
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('mm_rest'),
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('plugin.manager.mm_rest_entity_processor'),
      $container->get('config.factory'),
      $container->get('mm_rest.cacheable_metadata_collector'),
      $container->get('menu.link_tree'),
      $container->get('state'),
      $container->get('csrf_token'),
      $container->get('path.alias_manager')
    );
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {
    // As this endpoint do not return an Entity object, it does not implement
    // requestData, because parent::addCacheableDependency would add a metadata
    // with cacheMaxAge = 0.
  }

  /**
   * @inheritDoc
   */
  public function get() {
    $data = [
      'csrfToken' => $this->csrfToken->get('rest'),
      'routes' => $this->getRouters(),
      'contactOptions' => [
        'phone' => [
          'phoneNumber' => $this->state->get('contact_options_phone'),
        ],
        'email' => [
          'emailAddress' => $this->state->get('contact_options_email_address'),
          'emailSubject' => $this->state->get('contact_options_email_subject'),
          'emailBody' => $this->state->get('contact_options_email_body'),
        ],
      ],
      'layout' => [
        'navigation' => $this->getMenu('main'),
        'footer' => [
          'copyright' => $this->state->get('footer_copyright'),
          'mainLinks' => $this->getMenu('footer'),
          'secondaryLinks' => [
            $this->getMenu('footer-secondary-1'),
            $this->getMenu('footer-secondary-2'),
          ],
          'social' => $this->getSocialNetworks(),
        ],
        'slideOutPanel' => [
          'contact' => [
            'subHeading' => $this->state->get('slideout_panel_subheading'),
            'heading' => $this->state->get('slideout_panel_heading'),
            'submitLabel' => 'Send',
          ],
        ],
      ],
      'language' => [
        'translations' => [
          [
            "country" => "us",
            "language" => "en",
          ]
        ],
      ],
    ];

    $this->addCacheableDependency();

    return $data;
  }

  /**
   * Returns an array of pre configured routers.
   *
   * @return array
   */
  protected function getRouters() {
    $routers = [
      'landing' => $this->urlHelper($this->state->get('site_frontpage')),
      'notFound' => $this->urlHelper($this->state->get('site_404')),
      'articleOverviewPage' => $this->urlHelper($this->state->get('article_overview_page')),
    ];

    return $routers;
  }

  /**
   * Helper function for transform internal/external links into URLs.
   *
   * @param $url
   * @return null|string
   */
  protected function urlHelper($url) {
    if (empty($url)) {
      return NULL;
    }

    $url = UrlHelper::stripDangerousProtocols($url);
    $external = UrlHelper::isExternal($url);

    if (!$external) {
      $url = $url[0] == '/' ? $url : "/$url";
      $url = $this->pathAliasManager->getAliasByPath($url);
      $url = substr($url, 1);
    }

    return $url;
  }

  /**
   * Retrieves Social Networks and Menu links with their children sorted by
   * weight from the Drupal backend.
   *
   * @param string $menu
   * @return array Menus with their children.
   */
  protected function getMenu($menu) {
    $menu_items = [];
    $menu_tree = $this->menuLinkTree->load($menu,  new MenuTreeParameters());

    // Perform some access check and sorting manipulations on the given menu tree.
    $manipulators = [
      [
        'callable' => 'menu.default_tree_manipulators:checkNodeAccess'
      ],
      [
        'callable' => 'menu.default_tree_manipulators:checkAccess'
      ],
      [
        'callable' => 'menu.default_tree_manipulators:generateIndexAndSort'
      ],
    ];
    $menu_tree = $this->menuLinkTree->transform($menu_tree, $manipulators);

    foreach ($menu_tree as $menu_item) {
      $prepared_menu_item = $this->prepareMenuLink($menu_item, $menu);
      if ($prepared_menu_item) {
        // Make sure that we only add accessible menu items!
        $menu_items[] = $prepared_menu_item;
      }
    }

    return $menu_items;
  }

  /**
   * Parses a MenuLinkTreeElement recursively getting the name, route and
   * children of it and it's subtree. while taking into account cacheableMetatadata
   * from menu links.
   *
   * @param MenuLinkTreeElement $menu_item
   * @param bool $child
   * @return array|null
   */
  protected function prepareMenuLink(MenuLinkTreeElement $menu_item, $menu) {
    $parsed_array = NULL;

    if ($menu_item->access instanceof AccessResultAllowed && $menu_item->link->isEnabled()) {
      $link = $menu_item->link;
      $url = $link->getUrlObject(false);

      // Stop Language processor. URLs in the main menu shouldn't be translated.
      $url->setOption('language', new Language());

      $url = $url->toString(true)->getGeneratedUrl();

      $parsed_array = [
        "label" => $link->getTitle(),
        "title" => $link->getTitle(),
        "target" => $url,
        "type" => UrlHelper::isExternal($url) ? self::MENU_LINK_EXTERNAL : self::MENU_LINK_INTERNAL,
      ];

      // Temporally solution.
      if ($menu == 'main') {
        $parsed_array = [
          "link" => $parsed_array,
        ];
      }
    }

    return $parsed_array;
  }

  /**
   * Returns the Spectrum social networks.
   *
   * @return array
   */
  protected function getSocialNetworks() {
    $items = [];
    $networks = $this->state->get('socialNetworks');

    if (empty($networks)) {
      return [];
    }

    foreach ($networks as $network) {
      $items[$network['id']] = [
        'label' => $network['label'] ?: NULL,
        'title' => $network['label'] ?: NULL,
        'target' => $network['target'] ?: NULL,
        'type' => $network['target'] ? (int) UrlHelper::isExternal($network['target']) : NULL,
      ];
    }

    return $items;
  }

  /**
   * Add Cache dependency when a node is created or modified, when FE menu is
   * edited and Spin settings are updated.
   */
  public function addCacheableDependency() {
    //$config = $this->config->get('spin_settings.settings');

    parent::addCacheableDependency();

    $meta_data = new CacheableMetadata();
    $meta_data->setCacheTags([
      'node_list',
      'config:system.menu.main',
      'config:system.menu.footer',
      'config:system.menu.footer-secondary-1',
      'config:system.menu.footer-secondary-2',
      'config:system.menu.social',
      'spectrum:settings',
    ]);

    $this->cacheabilityCollector->addCacheableDependency($meta_data);
  }

}
