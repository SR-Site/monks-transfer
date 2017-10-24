<?php

namespace Drupal\spectrum_rest\Plugin\RestEntityProcessor\ParagraphBlock;

use Drupal\spectrum_rest\Plugin\SpectrumRestEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @RestEntityProcessor(
 *   id = "spectrum_rest_paragraph_block_video_with_call_to_actions_v1",
 *   label = @Translation("Paragraph: block_video_with_call_to_actions"),
 *   version = "v1",
 *   entity_type = "paragraph",
 *   bundle = "block_video_with_call_to_actions",
 *   view_mode = "default"
 * )
 */
class ParagraphBlockVideoWithCallToActionV1 extends SpectrumRestEntityProcessorBase {

    /**
     * {@inheritdoc}
     */
    protected function getItemData($entity) {
        $data = [
            "id" => 'videoCallToActions',
            "data" => [
                    "topheading" => $this->fieldProcessor->getFieldData($entity->get('field_top_heading')),
                    "topparagraph" => $this->fieldProcessor->getFieldData($entity->get('field_top_paragraph')),
                    "alignment" => (int) $entity->get('field_alignment')->value,
                    "background" => $this->image($entity->get('field_image')),
                    "heading" => $this->fieldProcessor->getFieldData($entity->get('field_heading')),
                    "paragraph" => $this->fieldProcessor->getFieldData($entity->get('field_paragraph')),
                    "ctaheading" => $this->fieldProcessor->getFieldData($entity->get('field_call_to_action_heading')),
                    "download" => $this->fieldProcessor->getFieldData($entity->get('field_call_to_action_file')),
                    "video" => $this->fieldProcessor->getFieldData($entity->get('field_video')),
                ]
        ];

        return $data;
    }

}
