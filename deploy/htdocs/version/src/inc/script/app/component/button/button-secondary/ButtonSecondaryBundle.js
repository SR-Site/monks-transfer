define([
    "require",
    "exports",
    'app/component/button/button-secondary/ButtonSecondaryController',
    'app/component/button/button-secondary/ButtonSecondaryViewModel',
    'text!app/component/button/button-secondary/button-secondary.html'
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
