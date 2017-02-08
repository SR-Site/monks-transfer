define([
    "require",
    "exports",
    'app/component/button/button-circle-icon/ButtonCircleIconController',
    'app/component/button/button-circle-icon/ButtonCircleIconViewModel',
    'text!app/component/button/button-circle-icon/button-circle-icon.html'
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
