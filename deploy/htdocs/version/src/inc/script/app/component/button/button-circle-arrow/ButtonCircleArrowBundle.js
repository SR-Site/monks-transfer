define([
    "require",
    "exports",
    'app/component/button/button-circle-arrow/ButtonCircleArrowController',
    'app/component/button/button-circle-arrow/ButtonCircleArrowViewModel',
    'text!app/component/button/button-circle-arrow/button-circle-arrow.html'
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
