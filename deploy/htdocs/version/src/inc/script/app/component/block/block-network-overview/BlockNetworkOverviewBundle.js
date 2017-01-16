define([
    "require",
    "exports",
    'app/component/block/block-network-overview/BlockNetworkOverviewController',
    'app/component/block/block-network-overview/BlockNetworkOverviewViewModel',
    'text!app/component/block/block-network-overview/block-network-overview.html'
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
