define([
    "require",
    "exports",
    'app/component/map-slider/MapSliderController',
    'app/component/map-slider/MapSliderViewModel',
    'text!app/component/map-slider/map-slider.html'
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
