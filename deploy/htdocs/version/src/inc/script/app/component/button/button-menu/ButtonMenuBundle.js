define([
    "require",
    "exports",
    'app/component/button/button-menu/ButtonMenuController',
    'app/component/button/button-menu/ButtonMenuViewModel',
    'text!app/component/button/button-menu/button-menu.html'
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
