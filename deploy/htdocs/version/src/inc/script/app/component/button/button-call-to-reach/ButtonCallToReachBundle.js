define([
    "require",
    "exports",
    'app/component/button/button-call-to-reach/ButtonCallToReachController',
    'app/component/button/button-call-to-reach/ButtonCallToReachViewModel',
    'text!app/component/button/button-call-to-reach/button-call-to-reach.html'
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
