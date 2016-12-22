define([
    "require",
    "exports",
    'app/component/header/HeaderController',
    'app/component/header/HeaderViewModel',
    'text!app/component/header/header.html'
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
