define([
    "require",
    "exports",
    'app/component/percentage-loader/PercentageLoaderController',
    'app/component/percentage-loader/PercentageLoaderViewModel',
    'text!app/component/percentage-loader/percentage-loader.html'
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
