define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/slide/slide-icon-progress/SlideIconProgressController',
    'app/component/block/block-map-tertiary/slide/slide-icon-progress/SlideIconProgressViewModel',
    'text!app/component/block/block-map-tertiary/slide/slide-icon-progress/slide-icon-progress.html'
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
