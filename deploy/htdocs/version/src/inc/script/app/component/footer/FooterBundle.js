define([
    "require",
    "exports",
    'app/component/footer/FooterController',
    'app/component/footer/FooterViewModel',
    'text!app/component/footer/footer.html'
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
