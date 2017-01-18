define([
    "require",
    "exports",
    'app/component/block/block-button/BlockButtonController',
    'app/component/block/block-button/BlockButtonViewModel',
    'text!app/component/block/block-button/block-button.html'
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
