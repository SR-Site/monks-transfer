define([
    "require",
    "exports",
    'app/component/page-loader/PageLoaderController',
    'app/component/page-loader/PageLoaderViewModel',
    'text!app/component/page-loader/page-loader.html'
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
