define([
    "require",
    "exports",
    'app/component/menu/MenuController',
    'app/component/menu/MenuViewModel',
    'text!app/component/menu/menu.html'
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
