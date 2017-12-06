<?php

namespace Drupal\spectrum_twitter_api\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a form that configures forms module settings.
 */
class SpectrumTwitterApiForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'spectrum_twitter_api_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'spectrum_twitter_api.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, Request $request = NULL) {
    $config = $this->config('spectrum_twitter_api.settings');

    $form['tweets_username'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Tweets username'),
      '#default_value' => $config->get('tweets_username'),
    ];

    $form['access_token'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Access token'),
      '#default_value' => $config->get('access_token'),
    ];

    $form['token_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Token secret'),
      '#default_value' => $config->get('token_secret'),
    ];

    $form['consumer_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Consumer key'),
      '#default_value' => $config->get('consumer_key'),
    ];

    $form['consumer_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Consumer secret'),
      '#default_value' => $config->get('consumer_secret'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('spectrum_twitter_api.settings')
      ->set('tweets_username', $values['tweets_username'])
      ->set('access_token', $values['access_token'])
      ->set('token_secret', $values['token_secret'])
      ->set('consumer_key', $values['consumer_key'])
      ->set('consumer_secret', $values['consumer_secret'])
      ->save();
  }

}
