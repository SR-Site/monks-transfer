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
   * State service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * SpinAwardsSettingsForm constructor.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   Configuration factory.
   * @param \Drupal\Core\State\StateInterface $state
   *   State object.
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

    $form['ga_account'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Google Analytics account'),
      '#description' => $this->t('E.g. UA-XXXXXX'),
      '#default_value' => $this->state->get('ga_account'),
      '#maxlength' => 32,
      '#size' => 32,
    ];

    $form['contact_to'] = [
      '#type' => 'email',
      '#title' => $this->t('Contact Form destination'),
      '#description' => $this->t('E-mail destination to send contact e-mails, e.g. email@example.com'),
      '#default_value' => $this->state->get('contact_to'),
      '#maxlength' => 255,
      '#size' => 32,
    ];

    // Contact.
    $form['group_contact_options'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Init resource contact form'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
      "options" => [
        "contact_options_phone" => [
          '#type' => 'textfield',
          '#title' => $this->t('Phone'),
          '#default_value' => empty($this->state->get('contact_options_phone')) ? '1-844-TO-REACH' : $this->state->get('contact_options_phone'),
          '#size' => 32,
        ],
        [
          '#type' => 'fieldset',
          '#title' => $this->t('Email'),
          '#collapsible' => FALSE,
          '#collapsed' => FALSE,
          "options" => [
            "contact_options_email_subject" => [
              '#type' => 'textfield',
              '#title' => $this->t('Subject'),
              '#default_value' => empty($this->state->get('contact_options_email_subject')) ? 'Email subject goes here' : $this->state->get('contact_options_email_subject'),
            ],
            "contact_options_email_body" => [
              '#type' => 'textfield',
              '#title' => $this->t('Body'),
              '#default_value' => empty($this->state->get('contact_options_email_body')) ? 'Email body goes here' : $this->state->get('contact_options_email_body'),
            ],
            "contact_options_email_address" => [
              '#type' => 'textfield',
              '#title' => $this->t('Address'),
              '#default_value' => empty($this->state->get('contact_options_email_address')) ? 'spectrumreach@spectrum.com' : $this->state->get('contact_options_email_address'),
            ],
          ],
        ],
      ],
    ];

    $form['group_footer'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Footer'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
      "options" => [
        "footer_copyright" => [
          '#type' => 'textarea',
          '#title' => $this->t('Copyright'),
          '#default_value' => empty($this->state->get('footer_copyright')) ? 'Charter Communications &copy;' : $this->state->get('footer_copyright'),
          '#size' => 32,
        ],
      ],
    ];

    $form['group_slideout_panel'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Slideout panel'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
      'contact_options' => [
        '#type' => 'fieldset',
        '#title' => $this->t('Contact'),
        'options' => [
          "slideout_panel_heading" => [
            '#type' => 'textfield',
            '#title' => $this->t('Heading'),
            '#default_value' => empty($this->state->get('slideout_panel_heading')) ? 'Let\'s talk!<br/>Tell us how we can help you advertise.' : $this->state->get('slideout_panel_heading'),
          ],
          "slideout_panel_subheading" => [
            '#type' => 'textfield',
            '#title' => $this->t('Subheading'),
            '#default_value' => empty($this->state->get('slideout_panel_subheading')) ? 'Get Started Today.' : $this->state->get('slideout_panel_subheading'),
          ],
        ],
      ],
      'contact_kernel_options' => [
        '#type' => 'fieldset',
        '#title' => $this->t('Contact Kernel'),
        'options' => [
          "slideout_panel_heading_kernel" => [
            '#type' => 'textfield',
            '#title' => $this->t('Contact Kernel Heading'),
            '#default_value' => empty($this->state->get('slideout_panel_heading_kernel')) ? 'Tell us which creative service you need' : $this->state->get('slideout_panel_heading_kernel'),
          ],
          "slideout_panel_subheading_kernel" => [
            '#type' => 'textfield',
            '#title' => $this->t('Contact Kernel Subheading'),
            '#default_value' => empty($this->state->get('slideout_panel_subheading_kernel')) ? 'Contact Kernel.' : $this->state->get('slideout_panel_subheading_kernel'),
          ],
        ],
      ],
    ];

    // Pardot.

    $form['group_pardot'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Pardot contact form'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    ];

    $form['group_pardot']['pardot_action'] = [
      '#type' => 'url',
      '#title' => $this->t('Destination URL to the Pardot contact form'),
      '#default_value' => $this->state->get('pardot_action'),
      '#size' => 32,
    ];

    $form['group_pardot']['pardot_referer'] = [
      '#type' => 'url',
      '#title' => $this->t('Referer URL to the Pardot contact form'),
      '#default_value' => $this->state->get('pardot_referer'),
      '#size' => 32,
    ];

    // Init routers.

    $form['group_routers'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Routers'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    ];

    $form['group_routers']['site_404'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Default 404 (not found) page'),
      '#description' => $this->t('External or internal URLs, e.g. http://google.com, /user, #header, some page title.'),
      '#default_value' => static::getUriAsDisplayableString($this->state->get('site_404')),
      '#element_validate' => [[get_called_class(), 'validateUriElement']],
      '#target_type' => 'node',
      '#process_default_value' => FALSE,
      '#attributes' => ['data-autocomplete-first-character-blacklist' => '/#?'],
    ];

    $form['group_routers']['article_overview_page'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Article overview page'),
      '#default_value' => static::getUriAsDisplayableString($this->state->get('article_overview_page')),
      '#element_validate' => [[get_called_class(), 'validateUriElement']],
      '#target_type' => 'node',
      '#process_default_value' => FALSE,
      '#attributes' => ['data-autocomplete-first-character-blacklist' => '/#?'],
    ];

    $form['group_routers']['site_frontpage'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Default landing (home) page'),
      '#description' => $this->t('External or internal URLs, e.g. http://google.com, /user, #header, some page title.'),
      '#default_value' => static::getUriAsDisplayableString($this->state->get('site_frontpage')),
      '#element_validate' => [[get_called_class(), 'validateUriElement']],
      '#target_type' => 'node',
      '#process_default_value' => FALSE,
      '#attributes' => ['data-autocomplete-first-character-blacklist' => '/#?'],
    ];

    // Social networks.

    $form['group0'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Social networks'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    ];

    $form['group0']['social_networks'] = [
      '#type' => 'table',
      '#header' => [t('ID'), t('Label'), t('Target'), t('Weight'), t('Delete')],
      '#empty' => t('There are no items yet. Add an item.'),
      // TableDrag: Each array value is a list of callback arguments for
      // drupal_add_tabledrag(). The #id of the table is automatically prepended;
      // if there is none, an HTML ID is auto-generated.
      '#tabledrag' => [
        [
          'action' => 'order',
          'relationship' => 'sibling',
          'group' => 'social-networks-order-weight',
        ],
      ],
    ];

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

      $form['group0']['social_networks'][$id]['id'] = [
        '#type' => 'textfield',
        '#default_value' => $item['id'],
        '#placeholder' => empty($item['id']) ? t('Add a new item') : NULL,
      ];

      $form['group0']['social_networks'][$id]['label'] = [
        '#type' => 'textfield',
        '#default_value' => $item['label'],
      ];

      $form['group0']['social_networks'][$id]['target'] = [
        '#type' => 'url',
        '#default_value' => $item['target'],
      ];

      // TableDrag: Weight column element.
      $form['group0']['social_networks'][$id]['weight'] = [
        '#type' => 'weight',
        '#title' => t('Weight for @title', ['@title' => $item['id']]),
        '#title_display' => 'invisible',
        '#default_value' => $item['weight'],
        // Classify the weight element for #tabledrag.
        '#attributes' => ['class' => ['social-networks-order-weight']],
      ];

      $form['group0']['social_networks'][$id]['delete'] = [
        '#type' => 'checkbox',
      ];
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
    $this->state->set('pardot_referer', $form_state->getValue('pardot_referer'));
    $this->state->set('pardot_action', $form_state->getValue('pardot_action'));

    $this->state->set('slideout_panel_subheading', $form_state->getValue('slideout_panel_subheading'));
    $this->state->set('slideout_panel_heading', $form_state->getValue('slideout_panel_heading'));
    $this->state->set('slideout_panel_subheading_kerne', $form_state->getValue('slideout_panel_subheading_kerne'));
    $this->state->set('slideout_panel_heading_kernel', $form_state->getValue('slideout_panel_heading_kernel'));
    $this->state->set('footer_copyright', $form_state->getValue('footer_copyright'));
    $this->state->set('contact_options_email_address', $form_state->getValue('contact_options_email_address'));
    $this->state->set('contact_options_email_body', $form_state->getValue('contact_options_email_body'));
    $this->state->set('contact_options_email_subject', $form_state->getValue('contact_options_email_subject'));
    $this->state->set('contact_options_phone', $form_state->getValue('contact_options_phone'));
    $this->state->set('article_overview_page', $form_state->getValue('article_overview_page'));

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
   *   Element array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form state object.
   * @param array $form
   *   Form array.
   *
   * @see \Drupal\link\Plugin\Field\FieldWidget\LinkWidget
   */
  public static function validateUriElement(array $element, FormStateInterface $form_state, array $form) {
    $uri = static::getUserEnteredStringAsUri($element['#value']);
    $form_state->setValueForElement($element, $uri);

    // If getUserEnteredStringAsUri() mapped the entered value to a 'internal:'
    // URI , ensure the raw value begins with '/', '?' or '#'.
    if (parse_url($uri, PHP_URL_SCHEME) === 'internal'
      && !in_array($element['#value'][0], ['/', '?', '#'], TRUE)
      && substr($element['#value'], 0, 7) !== '<front>') {
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
   *   Displayable string.
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
      if ($entity_manager->getDefinition($entity_type, FALSE)
        && $entity = \Drupal::entityManager()->getStorage($entity_type)->load($entity_id)) {
        $displayable_string = EntityAutocomplete::getEntityLabels([$entity]);
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
      // - '<front>' -> '/'.
      // - '<front>#foo' -> '/#foo'.
      if (strpos($string, '<front>') === 0) {
        $string = '/' . substr($string, strlen('<front>'));
      }
      $uri = 'internal:' . $string;
    }

    return $uri;
  }

}
