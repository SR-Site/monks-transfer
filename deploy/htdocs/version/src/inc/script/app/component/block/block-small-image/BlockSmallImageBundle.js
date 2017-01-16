define([
    "require",
    "exports",
    'app/component/block/block-small-image/BlockSmallImageController',
    'app/component/block/block-small-image/BlockSmallImageViewModel',
    'text!app/component/block/block-small-image/block-small-image.html'
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
