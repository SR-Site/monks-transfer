define([
    "require",
    "exports",
    'app/component/button/button-circle-close/ButtonCircleCloseController',
    'app/component/button/button-circle-close/ButtonCircleCloseViewModel',
    'text!app/component/button/button-circle-close/button-circle-close.html'
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
