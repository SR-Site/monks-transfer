<?php

namespace Drupal\spectrum_rest\Plugin\rest\resource;

use Drupal\spectrum_rest\Plugin\EntityResourceBase;

/**
 * Provides a resource to get Page node data.
 *
 * @RestResource(
 *   id = "spectrum_rest_article_v1",
 *   version = "v1",
 *   entity_type = "node",
 *   entity_bundle = "article",
 *   label = @Translation("Spectrum rest Article resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/article/{slug}"
 *   }
 * )
 */
class ArticleResource extends EntityResourceBase {

  /**
   * Responds to entity GET requests with parameter.
   * Remove the validateRequest() call from the parent function, because it will
   * try to check this bundle 'article' with the 404 page bundle, which is
   * 'page' and it will throw an exception. Improve the 404 system.
   *
   * @param string $slug
   * @return array
   */
  public function get($slug) {

    $slug = $this->slugPathProcessor->resolveSlug($this->request, $slug);

    // Try to load the entity based on the slug.
    /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
    $entity = $this->slugResolver->loadEntityBySlug($slug);

    if (empty($entity)) {
      // @TODO: improve this, implement something like \Drupal\Core\EventSubscriber\ExceptionJsonSubscriber
      if ($notFound = $this->state->get('site_404')) {
        $this->disableCache();

        list(, $nid) = explode('/', $notFound);
        /** @var \Drupal\Core\Entity\ContentEntityInterface $entity */
        $entity = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
      }
    }

    if (empty($entity)) {
      // Throw our own NotFoundHttpException, which implements
      // ExceptionInterface to avoid cache.
      throw new NotFoundHttpException($this->t('Not found'));
    }

    $this->requestData = $entity;

    $this->validateAccess();

    $this->addCacheableDependency();

    return $this->responseData();
  }

}
