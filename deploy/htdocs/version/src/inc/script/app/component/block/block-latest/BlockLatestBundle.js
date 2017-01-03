define([
    "require",
    "exports",
    'app/component/block/block-latest/BlockLatestController',
    'app/component/block/block-latest/BlockLatestViewModel',
    'text!app/component/block/block-latest/block-latest.html'
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
