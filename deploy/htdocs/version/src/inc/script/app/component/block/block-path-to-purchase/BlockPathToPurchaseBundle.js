define([
    "require",
    "exports",
    'app/component/block/block-path-to-purchase/BlockPathToPurchaseController',
    'app/component/block/block-path-to-purchase/BlockPathToPurchaseViewModel',
    'text!app/component/block/block-path-to-purchase/block-path-to-purchase.html'
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
