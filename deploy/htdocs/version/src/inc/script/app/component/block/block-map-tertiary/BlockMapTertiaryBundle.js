define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/BlockMapTertiaryController',
    'app/component/block/block-map-tertiary/BlockMapTertiaryViewModel',
    'text!app/component/block/block-map-tertiary/block-map-tertiary.html'
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
