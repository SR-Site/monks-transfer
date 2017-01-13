define([
    "require",
    "exports",
    'app/component/block/block-market-map/BlockMarketMapController',
    'app/component/block/block-market-map/BlockMarketMapViewModel',
    'text!app/component/block/block-market-map/block-market-map.html'
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
