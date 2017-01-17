define([
    "require",
    "exports",
    'app/component/block/block-more/BlockMoreController',
    'app/component/block/block-more/BlockMoreViewModel',
    'text!app/component/block/block-more/block-more.html'
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
