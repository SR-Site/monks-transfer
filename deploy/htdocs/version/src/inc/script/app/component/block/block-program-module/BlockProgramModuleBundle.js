define([
    "require",
    "exports",
    'app/component/block/block-program-module/BlockProgramModuleController',
    'app/component/block/block-program-module/BlockProgramModuleViewModel',
    'text!app/component/block/block-program-module/block-program-module.html'
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
