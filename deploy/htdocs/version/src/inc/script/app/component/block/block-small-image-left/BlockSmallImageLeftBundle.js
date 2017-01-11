define([
    "require",
    "exports",
    'app/component/block/block-small-image-left/BlockSmallImageLeftController',
    'app/component/block/block-small-image-left/BlockSmallImageLeftViewModel',
    'text!app/component/block/block-small-image-left/block-small-image-left.html'
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
