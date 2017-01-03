define([
    "require",
    "exports",
    'app/component/button/button-tag/ButtonTagController',
    'app/component/button/button-tag/ButtonTagViewModel',
    'text!app/component/button/button-tag/button-tag.html'
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
