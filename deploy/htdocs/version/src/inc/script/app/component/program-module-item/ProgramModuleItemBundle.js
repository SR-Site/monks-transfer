define([
    "require",
    "exports",
    'app/component/program-module-item/ProgramModuleItemController',
    'app/component/program-module-item/ProgramModuleItemViewModel',
    'text!app/component/program-module-item/program-module-item.html'
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
