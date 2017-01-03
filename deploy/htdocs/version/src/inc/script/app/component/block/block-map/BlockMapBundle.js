define([
    "require",
    "exports",
    'app/component/block/block-map/BlockMapController',
    'app/component/block/block-map/BlockMapViewModel',
    'text!app/component/block/block-map/block-map.html'
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
