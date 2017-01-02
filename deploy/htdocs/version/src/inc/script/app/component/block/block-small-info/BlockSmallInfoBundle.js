define([
    "require",
    "exports",
    'app/component/block/block-small-info/BlockSmallInfoController',
    'app/component/block/block-small-info/BlockSmallInfoViewModel',
    'text!app/component/block/block-small-info/block-small-info.html'
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
