<?php

namespace Drupal\spectrum_rest\Plugin;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Datetime\DateFormatter;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Language\Language;
use Drupal\Core\Menu\MenuActiveTrailInterface;
use Drupal\Core\Menu\MenuLinkManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\RestEntityProcessorBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\mm_rest\Plugin\RestFieldProcessorManager;
use Drupal\taxonomy\Entity\Term;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Common class for Paragraph blocks.
 *
 * @package Drupal\spectrum_rest\Plugin
 */
abstract class SpectrumRestEntityProcessorBase extends RestEntityProcessorBase {

  /**
   * The Alias Manager service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The Date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatter
   */
  protected $dateFormatter;

  /**
   * The active menu trail service.
   *
   * @var \Drupal\Core\Menu\MenuActiveTrailInterface
   */
  protected $menuActiveTrail;

  /**
   * The menu link manager.
   *
   * @var \Drupal\Core\Menu\MenuLinkManagerInterface
   */
  protected $menuLinkManager;

  /**
   * Config Factory.
   *
   * @var \Drupal\Core\Config\ConfigFactory
   */
  protected $config;

  /**
   * State service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs a Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase object.
   *
   * @param array $configuration
   *   Configuration.
   * @param string $plugin_id
   *   Plugin ID.
   * @param mixed $plugin_definition
   *   Plugin definition.
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   *   Entity processor.
   * @param \Drupal\mm_rest\Plugin\RestFieldProcessorManager $field_processor
   *   Field processor.
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   *   Cacheable MetaData Collector.
   * @param \Drupal\Core\Entity\EntityRepositoryInterface $entity_repository
   *   Entity repository.
   * @param \Drupal\Core\Path\AliasManagerInterface $alias_manager
   *   Alias manager.
   * @param \Drupal\Core\Datetime\DateFormatter $date_formatter
   *   Date format.
   * @param \Drupal\Core\Menu\MenuActiveTrailInterface $menu_active_trail
   *   The active menu trail service.
   * @param \Drupal\Core\Menu\MenuLinkManagerInterface $menu_link_manager
   *   The menu link manager.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   *   Config factory.
   * @param \Drupal\Core\State\StateInterface $state
   *   State object.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RestEntityProcessorManager $entity_processor, RestFieldProcessorManager $field_processor, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, EntityRepositoryInterface $entity_repository, AliasManagerInterface $alias_manager, DateFormatter $date_formatter, MenuActiveTrailInterface $menu_active_trail, MenuLinkManagerInterface $menu_link_manager, ConfigFactoryInterface $configFactory, StateInterface $state) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $entity_processor, $field_processor, $cacheable_metadata_collector, $entity_repository);
    $this->aliasManager = $alias_manager;
    $this->dateFormatter = $date_formatter;
    $this->menuActiveTrail = $menu_active_trail;
    $this->menuLinkManager = $menu_link_manager;
    $this->config = $configFactory;
    $this->state = $state;
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
      $container->get('state')
    );
  }

  /**
   * Common properties for all Paragraph blocks.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Content entity.
   *
   * @return array|string
   *   Array of common data.
   */
  public function getCommonData(ContentEntityInterface $entity) {
    return $this->fieldProcessor->getFieldData($entity->get('field_styles'));
  }

  /**
   * Common properties for all Paragraph blocks.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Content entity.
   *
   * @return array|string
   *   Array of heading and paragraph..
   */
  public function getHeadingParagraphData(ContentEntityInterface $entity) {
    return [
      'heading' => $this->fieldProcessor->getFieldData($entity->get('field_new_heading')),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
    ];
  }

  /**
   * Common properties for all Paragraph blocks.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Content entity.
   *
   * @return array|string
   *   Array of heading and paragraph..
   */
  public function getNormalHeadingParagraphData(ContentEntityInterface $entity) {
    return [
      'heading' => $this->fieldProcessor->getFieldData($entity->get('field_main_heading')),
      'paragraph' => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
    ];
  }

  /**
   * Make sure that it is always an array.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   *   Field item list.
   * @param array $options
   *   Options.
   *
   * @return array|string
   *   Array of items.
   */
  public function getItems(FieldItemListInterface $field, array $options = []) {
    // It have to be always an array.
    $items = $this->fieldProcessor->getFieldData($field, $options);

    /** @var \Drupal\Core\Field\FieldStorageDefinitionInterface $fieldStorage */
    $fieldStorage = $field->getFieldDefinition()->getFieldStorageDefinition();
    if (empty($items) && $fieldStorage->isMultiple()) {
      $items = [];
    }

    if (count($field) == 1) {
      $items = [$items];
    }

    return $items;
  }

  /**
   * Returns an image formatted.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $field
   *   Field item list.
   * @param array $options
   *   Options.
   *
   * @return array|string
   *   Image data..
   */
  public function image(FieldItemListInterface $field, array $options = []) {
    $image = $field->getValue();

    if (empty($image)) {
      return NULL;
    }

    $data = [
      'normal' => $this->fieldProcessor->getFieldData($field, $options),
      'small' => $this->fieldProcessor->getFieldData($field, $options),
      'alt' => isset($image[0]['alt']) && $image[0]['alt'] != NULL ? $image[0]['alt'] : $field->getEntity()
        ->label(),
    ];

    return $data;
  }

  /**
   * Returns an array of taxonomy terms from all vocabularies.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Content entity.
   *
   * @return array|string
   *   Array of tags.
   */
  protected function getTags(ContentEntityInterface $entity) {
    $tags = [];

    $tags = array_merge($tags, $this->getItems($entity->get('field_category')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_document_type')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_market')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_platform')) ?: []);
    $tags = array_merge($tags, $this->getItems($entity->get('field_thought_leadership')) ?: []);

    return $tags;
  }

  /**
   * Get Raw Entity Reference Label.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Entity.
   * @param string $fieldName
   *   Field name.
   * @param string|null $rawName
   *   Default value.
   *
   * @return mixed|null|string
   *   Raw entity label.
   */
  protected function getRawEntityReferenceLabel(ContentEntityInterface $entity, $fieldName, $rawName = NULL) {
    $landingCategoryID = $entity->get($fieldName)->target_id;
    $landingCategoryEntity = Term::load($landingCategoryID);
    if ($landingCategoryEntity instanceof ContentEntityInterface) {
      $landingCategoryFullName = $landingCategoryEntity->label();
      $rawName = strtolower($landingCategoryFullName);
      $rawName = preg_replace('/[^a-z0-9_]+/', '-', $rawName);
    }

    return $rawName;
  }

  /**
   * Display breadcrumbs of page.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   Entity.
   *
   * @return array
   *   Breadcrumbs array.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   * @throws \Exception
   */
  protected function displayBreadcrumbs(ContentEntityInterface $entity) {
    $breadcrumbs = [];

    // Get front page.
    $front = $this->state->get('site_frontpage');
    list($type, $internalUrl) = explode(':', $front);
    $currentUri = $entity->toUrl()->getInternalPath();

    // Create breadcrumbs.
    if ($internalUrl != $currentUri) {
      $breadcrumbs = [
        [
          "label" => "Home",
          "title" => "Home",
          "target" => "/home",
          "type" => 0,
        ],
      ];

      // Get parent item from menu.
      $menuLink = $this->menuLinkManager->loadLinksByRoute('entity.node.canonical', ['node' => $entity->id()]);
      if (count($menuLink) == 1) {
        $menuLink = reset($menuLink);
        if ($menuLink->getParent()) {
          $parents = $this->menuLinkManager->getParentIds($menuLink->getParent());
          if (!empty($parents)) {
            $parents = array_reverse($parents);
            $parent = reset($parents);
            $parentItem = $this->menuLinkManager->createInstance($parent);
            $title = $parentItem->getTitle();
            $url = $parentItem->getUrlObject(FALSE);
            // Stop Language processor. URLs in the main menu shouldn't be translated.
            $url->setOption('language', new Language());
            $url = $url->toString(TRUE)->getGeneratedUrl();
            $breadcrumbs[] = [
              "label" => $title,
              "title" => $title,
              "target" => $url,
              "type" => 0,
            ];
          }
        }
      }

      // Get current item..
      $breadcrumbs[] = [
        "label" => $entity->label(),
        "title" => $entity->label(),
        "target" => $entity->toUrl()->toString(),
        "type" => 0,
      ];
    }

    return $breadcrumbs;
  }

}
