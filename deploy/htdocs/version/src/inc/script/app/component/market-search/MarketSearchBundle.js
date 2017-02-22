define([
    "require",
    "exports",
    'app/component/market-search/MarketSearchController',
    'app/component/market-search/MarketSearchViewModel',
    'text!app/component/market-search/market-search.html'
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
