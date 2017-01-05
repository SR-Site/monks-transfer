define([
    "require",
    "exports",
    'app/component/block/block-map-secondary/BlockMapSecondaryController',
    'app/component/block/block-map-secondary/BlockMapSecondaryViewModel',
    'text!app/component/block/block-map-secondary/block-map-secondary.html'
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
