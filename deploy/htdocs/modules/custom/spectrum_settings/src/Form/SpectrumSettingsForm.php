<?php

namespace Drupal\spectrum_settings\Form;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\Element\EntityAutocomplete;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class SpectrumSettingsForm.
 *
 * @package Drupal\spin_settings\Form
 */
class SpectrumSettingsForm extends ConfigFormBase {

  /**
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * SpinAwardsSettingsForm constructor.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   * @param \Drupal\Core\State\StateInterface $state
   */
  public function __construct(ConfigFactoryInterface $config_factory, StateInterface $state) {
    parent::__construct($config_factory);

    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'spectrum_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['ga_account'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Google Analytics account'),
      '#description' => $this->t('E.g. UA-XXXXXX'),
      '#default_value' => $this->state->get('ga_account'),
      '#maxlength' => 32,
      '#size' => 32,
    );

    $form['contact_to'] = array(
      '#type' => 'email',
      '#title' => $this->t('Contact Form destination'),
      '#description' => $this->t('E-mail destination to send contact e-mails, e.g. email@example.com'),
      '#default_value' => $this->state->get('contact_to'),
      '#maxlength' => 255,
      '#size' => 32,
    );

    // Init routers.

    $form['group_routers'] = array(
      '#type' => 'fieldset',
      '#title' => $this->t('Routers'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );

    $form['group_routers']['site_404'] = array(
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Default 404 (not found) page'),
      '#description' => $this->t('External or internal URLs, e.g. http://google.com, /user, #header, some page title.'),
      '#default_value' => static::getUriAsDisplayableString($this->state->get('site_404')),
      '#element_validate' => array(array(get_called_class(), 'validateUriElement')),
      '#target_type' => 'node',
      '#process_default_value' => FALSE,
      '#attributes' => ['data-autocomplete-first-character-blacklist' => '/#?'],
    );

    $form['group_routers']['site_frontpage'] = array(
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Default landing (home) page'),
      '#description' => $this->t('External or internal URLs, e.g. http://google.com, /user, #header, some page title.'),
      '#default_value' => static::getUriAsDisplayableString($this->state->get('site_frontpage')),
      '#element_validate' => array(array(get_called_class(), 'validateUriElement')),
      '#target_type' => 'node',
      '#process_default_value' => FALSE,
      '#attributes' => ['data-autocomplete-first-character-blacklist' => '/#?'],
    );

    // Social networks.

    $form['group0'] = array(
      '#type' => 'fieldset',
      '#title' => $this->t('Social networks'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );

    $form['group0']['social_networks'] = array(
      '#type' => 'table',
      '#header' => array(t('ID'), t('Label'), t('Target'), t('Weight'), t('Delete')),
      '#empty' => t('There are no items yet. Add an item.', array(
      )),
      // TableDrag: Each array value is a list of callback arguments for
      // drupal_add_tabledrag(). The #id of the table is automatically prepended;
      // if there is none, an HTML ID is auto-generated.
      '#tabledrag' => array(
        array(
          'action' => 'order',
          'relationship' => 'sibling',
          'group' => 'social-networks-order-weight',
        ),
      ),
    );

    $items = $this->state->get('socialNetworks');

    // Add an empty value to allow adding new items.
    $items[] = [
      'weight' => 99,
      'id' => '',
      'label' => '',
      'target' => '',
    ];

    foreach ($items as $id => $item) {
      // TableDrag: Mark the table row as draggable.
      $form['group0']['social_networks'][$id]['#attributes']['class'][] = 'draggable';
      // TableDrag: Sort the table row according to its existing/configured weight.
      $form['group0']['social_networks'][$id]['#weight'] = $item['weight'];

      $form['group0']['social_networks'][$id]['id'] = array(
        '#type' => 'textfield',
        '#default_value' => $item['id'],
        '#placeholder' => empty($item['id']) ? t('Add a new item') : NULL,
      );

      $form['group0']['social_networks'][$id]['label'] = array(
        '#type' => 'textfield',
        '#default_value' => $item['label'],
      );

      $form['group0']['social_networks'][$id]['target'] = array(
        '#type' => 'url',
        '#default_value' => $item['target'],
      );

      // TableDrag: Weight column element.
      $form['group0']['social_networks'][$id]['weight'] = array(
        '#type' => 'weight',
        '#title' => t('Weight for @title', array('@title' => $item['id'])),
        '#title_display' => 'invisible',
        '#default_value' => $item['weight'],
        // Classify the weight element for #tabledrag.
        '#attributes' => array('class' => array('social-networks-order-weight')),
      );

      $form['group0']['social_networks'][$id]['delete'] = array(
        '#type' => 'checkbox',
      );
    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->state->set('ga_account', $form_state->getValue('ga_account'));
    $this->state->set('site_404', static::getUserEnteredStringAsUri($form_state->getValue('site_404')));
    $this->state->set('site_frontpage', static::getUserEnteredStringAsUri($form_state->getValue('site_frontpage')));
    $this->state->set('contact_to', $form_state->getValue('contact_to'));

    // Social networks.
    $socialNetworks = $form_state->getValue('social_networks');
    $social = [];
    foreach ($socialNetworks as $item) {
      if (!$item['delete'] && !empty($item['id']) && !empty($item['target'])) {
        $social[] = $item;
      }
    }

    $this->state->set('socialNetworks', $social);

    // Invalidate spectrum settings.
    Cache::invalidateTags(['spectrum:settings']);
  }

  /**
   * Form element validation handler for the 'uri' element.
   *
   * Disallows saving inaccessible or untrusted URLs.
   *
   * @param array $element
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * @param array $form
   *
   * @see \Drupal\link\Plugin\Field\FieldWidget\LinkWidget
   */
  public static function validateUriElement($element, FormStateInterface $form_state, $form) {
    $uri = static::getUserEnteredStringAsUri($element['#value']);
    $form_state->setValueForElement($element, $uri);

    // If getUserEnteredStringAsUri() mapped the entered value to a 'internal:'
    // URI , ensure the raw value begins with '/', '?' or '#'.
    if (parse_url($uri, PHP_URL_SCHEME) === 'internal' && !in_array($element['#value'][0], ['/', '?', '#'], TRUE) && substr($element['#value'], 0, 7) !== '<front>') {
      $form_state->setError($element, t('Manually entered paths should start with /, ? or #.'));
      return;
    }
  }

  /**
   * Gets the URI without the 'internal:' or 'entity:' scheme.
   *
   * The following two forms of URIs are transformed:
   * - 'entity:' URIs: to entity autocomplete ("label (entity id)") strings;
   * - 'internal:' URIs: the scheme is stripped.
   *
   * This method is the inverse of ::getUserEnteredStringAsUri().
   *
   * @param string $uri
   *   The URI to get the displayable string for.
   *
   * @return string
   *
   * @see \Drupal\link\Plugin\Field\FieldWidget\LinkWidget
   * @see static::getUserEnteredStringAsUri()
   */
  protected static function getUriAsDisplayableString($uri) {
    $scheme = parse_url($uri, PHP_URL_SCHEME);

    // By default, the displayable string is the URI.
    $displayable_string = $uri;

    // A different displayable string may be chosen in case of the 'internal:'
    // or 'entity:' built-in schemes.
    if ($scheme === 'internal') {
      $uri_reference = explode(':', $uri, 2)[1];

      $path = parse_url($uri, PHP_URL_PATH);
      if ($path === '/') {
        $uri_reference = '<front>' . substr($uri_reference, 1);
      }

      $displayable_string = $uri_reference;
    }
    elseif ($scheme === 'entity') {
      list($entity_type, $entity_id) = explode('/', substr($uri, 7), 2);
      // Show the 'entity:' URI as the entity autocomplete would.
      $entity_manager = \Drupal::entityManager();
      if ($entity_manager->getDefinition($entity_type, FALSE) && $entity = \Drupal::entityManager()->getStorage($entity_type)->load($entity_id)) {
        $displayable_string = EntityAutocomplete::getEntityLabels(array($entity));
      }
    }

    return $displayable_string;
  }

  /**
   * Gets the user-entered string as a URI.
   *
   * The following two forms of input are mapped to URIs:
   * - entity autocomplete ("label (entity id)") strings: to 'entity:' URIs;
   * - strings without a detectable scheme: to 'internal:' URIs.
   *
   * This method is the inverse of ::getUriAsDisplayableString().
   *
   * @param string $string
   *   The user-entered string.
   *
   * @return string
   *   The URI, if a non-empty $uri was passed.
   *
   * @see \Drupal\link\Plugin\Field\FieldWidget\LinkWidget
   * @see static::getUriAsDisplayableString()
   */
  protected static function getUserEnteredStringAsUri($string) {
    // By default, assume the entered string is an URI.
    $uri = $string;

    // Detect entity autocomplete string, map to 'entity:' URI.
    $entity_id = EntityAutocomplete::extractEntityIdFromAutocompleteInput($string);
    if ($entity_id !== NULL) {
      $uri = 'entity:node/' . $entity_id;
    }
    // Detect a schemeless string, map to 'internal:' URI.
    elseif (!empty($string) && parse_url($string, PHP_URL_SCHEME) === NULL) {
      // - '<front>' -> '/'
      // - '<front>#foo' -> '/#foo'
      if (strpos($string, '<front>') === 0) {
        $string = '/' . substr($string, strlen('<front>'));
      }
      $uri = 'internal:' . $string;
    }

    return $uri;
  }

}
