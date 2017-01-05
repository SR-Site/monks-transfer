define([
    "require",
    "exports",
    'app/component/block/block-quote/BlockQuoteController',
    'app/component/block/block-quote/BlockQuoteViewModel',
    'text!app/component/block/block-quote/block-quote.html'
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
