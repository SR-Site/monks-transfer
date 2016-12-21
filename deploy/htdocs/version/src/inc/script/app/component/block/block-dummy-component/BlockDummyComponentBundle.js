define([
    "require",
    "exports",
    'app/component/block/block-dummy-component/BlockDummyComponentController',
    'app/component/block/block-dummy-component/BlockDummyComponentViewModel',
    'text!app/component/block/block-dummy-component/block-dummy-component.html'
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
