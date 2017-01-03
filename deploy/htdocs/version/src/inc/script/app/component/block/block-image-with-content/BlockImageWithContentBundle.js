define([
    "require",
    "exports",
    'app/component/block/block-image-with-content/BlockImageWithContentController',
    'app/component/block/block-image-with-content/BlockImageWithContentViewModel',
    'text!app/component/block/block-image-with-content/block-image-with-content.html'
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
