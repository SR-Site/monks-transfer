<?php

namespace Drupal\spectrum_shows\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for Success story edit forms.
 *
 * @ingroup spectrum_shows
 */
class SuccessStoryForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = &$this->entity;

    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Success story.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Success story.', [
          '%label' => $entity->label(),
        ]));
    }
    $form_state->setRedirect('entity.success_story.canonical', ['success_story' => $entity->id()]);
  }

}
