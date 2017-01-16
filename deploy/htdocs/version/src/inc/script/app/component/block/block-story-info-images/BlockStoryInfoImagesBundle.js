define([
    "require",
    "exports",
    'app/component/block/block-story-info-images/BlockStoryInfoImagesController',
    'app/component/block/block-story-info-images/BlockStoryInfoImagesViewModel',
    'text!app/component/block/block-story-info-images/block-story-info-images.html'
], function (
    require,
    exports,
    controller,
    viewmodel,
    template
) {
    exports.controller = controller.default;
    exports.viewmodel = viewmodel.default;
    exports.template = template;
});
