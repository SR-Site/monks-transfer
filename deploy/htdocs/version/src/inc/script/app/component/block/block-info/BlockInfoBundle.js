define([
    "require",
    "exports",
    'app/component/block/block-info/BlockInfoController',
    'app/component/block/block-info/BlockInfoViewModel',
    'text!app/component/block/block-info/block-info.html'
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
