<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Mail\MailManager;
use Drupal\Core\State\StateInterface;
use Drupal\mm_rest\CacheableMetaDataCollectorInterface;
use Drupal\mm_rest\Plugin\ResourceBase;
use Drupal\mm_rest\Plugin\RestEntityProcessorManager;
use Drupal\spectrum_rest\SpectrumContactInterface;
use Egulias\EmailValidator\EmailValidator;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a resource to send a contact email.
 *
 * @RestResource(
 *   id = "spectrum_rest_contact_v1",
 *   version = "v1",
 *   label = @Translation("Spectrum rest Contact"),
 *   uri_paths = {
 *     "https://www.drupal.org/link-relations/create" = "/api/v1/contact"
 *   },
 *   serialization_class = "Drupal\spectrum_rest\SpectrumContactInterface"
 * )
 */
class Contact extends ResourceBase {

  /**
   * The MailManager service.
   *
   * @var \Drupal\Core\Mail\MailManager
   */
  protected $managerMail;

  /**
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * The email validator service.
   *
   * @var \Egulias\EmailValidator\EmailValidator
   */
  protected $emailValidator;

  /**
   * Responds to GET requests.
   *
   * @param \Drupal\spectrum_rest\SpectrumContactInterface $contact
   * @return array
   * @throws \Exception
   */
  public function post(SpectrumContactInterface $contact) {

    $langcode = \Drupal::currentUser()->getPreferredLangcode();

    // The contact object is needed for create the email body.
    $params = ['contact' => $contact];

    $to = $this->state->get('contact_to');

    if (!$this->emailValidator->isValid($to)) {
      throw new \UnexpectedValueException($this->t('The destination e-mail is invalid.'));
    }

    $message = $this->managerMail->mail('spectrum_rest', 'spectrum_contact', $to, $langcode, $params);

    if ($message['result'] == FALSE) {
      throw new \Exception($this->t('Unable to send email. Contact the site administrator if the problem persists.'));
    }

    return ['status' => $message['result']];
  }

  /**
   * @inheritDoc
   */
  protected function responseData() {}

  /**
   * Constructs a \Drupal\spectrum_rest\Plugin\rest\resource\Contact object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The current request.
   * @param \Drupal\mm_rest\Plugin\RestEntityProcessorManager $entity_processor
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   * @param \Drupal\mm_rest\CacheableMetaDataCollectorInterface $cacheable_metadata_collector
   * @param \Drupal\Core\Mail\MailManager $mail_manager
   * @param \Drupal\Core\State\StateInterface $state
   * @param \Egulias\EmailValidator\EmailValidator $email_validator
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, Request $request, RestEntityProcessorManager $entity_processor, ConfigFactoryInterface $configFactory, CacheableMetaDataCollectorInterface $cacheable_metadata_collector, MailManager $mail_manager, StateInterface $state, EmailValidator $email_validator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger, $request, $entity_processor, $configFactory, $cacheable_metadata_collector);

    $this->managerMail = $mail_manager;
    $this->state = $state;
    $this->emailValidator = $email_validator;
  }

  /**
   * {@inheritdoc}
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
      $container->get('plugin.manager.mail'),
      $container->get('state'),
      $container->get('email.validator')
    );
  }

}
