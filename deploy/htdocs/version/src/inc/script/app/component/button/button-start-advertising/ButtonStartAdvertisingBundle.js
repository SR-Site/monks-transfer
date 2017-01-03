define([
    "require",
    "exports",
    'app/component/button/button-start-advertising/ButtonStartAdvertisingController',
    'app/component/button/button-start-advertising/ButtonStartAdvertisingViewModel',
    'text!app/component/button/button-start-advertising/button-start-advertising.html'
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
