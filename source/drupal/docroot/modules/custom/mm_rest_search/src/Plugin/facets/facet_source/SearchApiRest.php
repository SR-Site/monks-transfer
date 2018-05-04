<?php

namespace Drupal\mm_rest_search\Plugin\facets\facet_source;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Path\CurrentPathStack;
use Drupal\facets\FacetSource\SearchApiFacetSourceInterface;
use Drupal\facets\Plugin\facets\facet_source\SearchApiBaseFacetSource;
use Drupal\search_api\Entity\Index;
use Drupal\search_api\Query\ResultSetInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A facet source to support search api views trough display plugins.
 *
 * @FacetsFacetSource(
 *   id = "mm_rest",
 *   deriver = "Drupal\mm_rest_search\Plugin\facets\facet_source\SearchApiRestDeriver"
 * )
 */
class SearchApiRest extends SearchApiBaseFacetSource {

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManager|null
   */
  protected $entityTypeManager;

  /**
   * The typed data manager.
   *
   * @var \Drupal\Core\TypedData\TypedDataManager|null
   */
  protected $typedDataManager;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface|null
   */
  protected $configFactory;

  /**
   * The path current service.
   *
   * @var \Drupal\Core\Path\CurrentPathStack
   */
  protected $pathCurrent;

  /**
   * The search index the query should is executed on.
   *
   * @var \Drupal\search_api\IndexInterface
   */
  protected $index;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, array $plugin_definition, $query_type_plugin_manager, $search_results_cache, CurrentPathStack $path_current) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $query_type_plugin_manager, $search_results_cache);

    $this->pathCurrent = $path_current;

    /* @var $search_api_index \Drupal\search_api\IndexInterface */
    $this->index = Index::load($plugin_definition['index_name']);

    if (empty($this->index)) {
      throw new \Exception($this->t("Index '@index' does not exist.", ['@index' => $plugin_definition['index_name']]));
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('plugin.manager.facets.query_type'),
      $container->get('search_api.query_helper'),
      $container->get('path.current')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {

    $form['field_identifier'] = [
      '#type' => 'select',
      '#options' => $this->getFields(),
      '#title' => $this->t('Field'),
      '#description' => $this->t('The field from the selected facet source which contains the data to build a facet for.'),
      '#required' => TRUE,
      '#default_value' => $this->facet->getFieldIdentifier(),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getPath() {
    $request = \Drupal::requestStack()->getMasterRequest();
    $uri = $this->pluginDefinition['path'];

    // GET parameter _format is required, otherwise Url::createFromRequest() will fail.
    // @see Drupal\facets\Plugin\facets\url_processor\QueryString::buildUrls()
    if ($format = $request->get('_format')) {
      $uri .= '?' . UrlHelper::buildQuery(['_format' => $format]) ;
    }

    return $uri;
  }

  /**
   * {@inheritdoc}
   */
  public function fillFacetsWithResults(array $facets) {
    $results = $this->searchApiQueryHelper->getResults($this->pluginId);

    if ($results instanceof ResultSetInterface) {
      // Get our facet data.
      $facet_results = $results->getExtraData('search_api_facets');
      if ($facet_results === []) {
        return;
      }

      // Loop over each facet and execute the build method from the given
      // query type.

      foreach ($facets as $facet) {
        $configuration = array(
          'query' => NULL,
          'facet' => $facet,
          'results' => isset($facet_results[$facet->getFieldIdentifier()]) ? $facet_results[$facet->getFieldIdentifier()] : [],
        );

        // Get the Facet Specific Query Type so we can process the results
        // using the build() function of the query type.
        $query_type = $this->queryTypePluginManager->createInstance($facet->getQueryType(), $configuration);
        $query_type->build();
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function isRenderedInCurrentRequest() {
    $request = \Drupal::requestStack()->getMasterRequest();

    $currentPath = $this->pathCurrent->getPath();

    // GET parameter _format is required, otherwise Url::createFromRequest() will fail.
    // @see Drupal\facets\Plugin\facets\url_processor\QueryString::buildUrls()
    // @see Drupal\mm_rest_search\Plugin\facets\facet_source\SearchApiRest::getPath()
    if ($format = $request->get('_format')) {
      $currentPath .= '?' . UrlHelper::buildQuery(['_format' => $format]) ;
    }

    if ($currentPath == $this->getPath()) {
      return TRUE;
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getIndex() {
    return $this->index;
  }

  /**
   * {@inheritdoc}
   */
  public function calculateDependencies() {
    return ['module' => ['node', 'mm_rest']];
  }

  public function getDataDefinition($field_name) {
    $field = $this->getIndex()->getField($field_name);
    if ($field) {
      return $field->getDataDefinition();
    }
    throw new \Exception("Field with name {$field_name} does not have a definition");
  }
}
