define([
    "require",
    "exports",
    'app/component/block/block-text/BlockTextController',
    'app/component/block/block-text/BlockTextViewModel',
    'text!app/component/block/block-text/block-text.html'
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
