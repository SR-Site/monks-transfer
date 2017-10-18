define([
    "require",
    "exports",
    'app/component/block/block-video-with-content/BlockVideoWithContentController',
    'app/component/block/block-video-with-content/BlockVideoWithContentViewModel',
    'text!app/component/block/block-video-with-content/block-video-with-content.html'
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
