define([
    "require",
    "exports",
    'app/component/vertical-graphic/VerticalGraphicController',
    'app/component/vertical-graphic/VerticalGraphicViewModel',
    'text!app/component/vertical-graphic/vertical-graphic.html'
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
