define([
    "require",
    "exports",
    'app/component/scroll-bar/ScrollBarController',
    'app/component/scroll-bar/ScrollBarViewModel',
    'text!app/component/scroll-bar/scroll-bar.html'
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