define([
    "require",
    "exports",
    'app/component/block/block-persona-selector/BlockPersonaSelectorController',
    'app/component/block/block-persona-selector/BlockPersonaSelectorViewModel',
    'text!app/component/block/block-persona-selector/block-persona-selector.html'
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
