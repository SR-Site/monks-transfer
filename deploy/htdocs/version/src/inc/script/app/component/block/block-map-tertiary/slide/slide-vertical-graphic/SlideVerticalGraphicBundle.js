define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/slide/slide-vertical-graphic/SlideVerticalGraphicController',
    'app/component/block/block-map-tertiary/slide/slide-vertical-graphic/SlideVerticalGraphicViewModel',
    'text!app/component/block/block-map-tertiary/slide/slide-vertical-graphic/slide-vertical-graphic.html'
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
