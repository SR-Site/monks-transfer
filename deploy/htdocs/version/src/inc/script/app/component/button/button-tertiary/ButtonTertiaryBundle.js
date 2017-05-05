define([
    "require",
    "exports",
    'app/component/button/button-tertiary/ButtonTertiaryController',
    'app/component/button/button-tertiary/ButtonTertiaryViewModel',
    'text!app/component/button/button-tertiary/button-tertiary.html'
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
