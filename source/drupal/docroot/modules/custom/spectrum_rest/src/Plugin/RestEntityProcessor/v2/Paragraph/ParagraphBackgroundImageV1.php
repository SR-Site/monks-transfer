<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\v2\Paragraph;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_background_image_v1",
 *   label = @Translation("Paragraph: Background image"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "background_image",
 *   view_mode = "default"
 * )
 */
class ParagraphBackgroundImageV1 extends ParagraphImageDefaultV1 {

}
