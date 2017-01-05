define([
    "require",
    "exports",
    'app/component/block/block-page-not-found/BlockPageNotFoundController',
    'app/component/block/block-page-not-found/BlockPageNotFoundViewModel',
    'text!app/component/block/block-page-not-found/block-page-not-found.html'
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
