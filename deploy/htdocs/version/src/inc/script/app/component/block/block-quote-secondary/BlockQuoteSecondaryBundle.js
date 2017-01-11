define([
    "require",
    "exports",
    'app/component/block/block-quote-secondary/BlockQuoteSecondaryController',
    'app/component/block/block-quote-secondary/BlockQuoteSecondaryViewModel',
    'text!app/component/block/block-quote-secondary/block-quote-secondary.html'
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
