define([
    "require",
    "exports",
    'app/component/button/button-main/ButtonMainController',
    'app/component/button/button-main/ButtonMainViewModel',
    'text!app/component/button/button-main/button-main.html'
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
