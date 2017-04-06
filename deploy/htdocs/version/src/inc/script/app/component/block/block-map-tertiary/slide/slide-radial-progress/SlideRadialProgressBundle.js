define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/slide/slide-radial-progress/SlideRadialProgressController',
    'app/component/block/block-map-tertiary/slide/slide-radial-progress/SlideRadialProgressViewModel',
    'text!app/component/block/block-map-tertiary/slide/slide-radial-progress/slide-radial-progress.html'
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
