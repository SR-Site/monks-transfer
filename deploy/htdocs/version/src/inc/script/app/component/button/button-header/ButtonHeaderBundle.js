define([
    "require",
    "exports",
    'app/component/button/button-header/ButtonHeaderController',
    'app/component/button/button-header/ButtonHeaderViewModel',
    'text!app/component/button/button-header/button-header.html'
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
