<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

use Drupal\mm_rest\Plugin\RestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_poster_v1",
 *   label = @Translation("Paragraph: poster"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "poster",
 *   view_mode = "default"
 * )
 */
class ParagraphPosterV1 extends ParagraphImageDefaultV1 {

}
