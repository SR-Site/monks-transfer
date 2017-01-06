define([
    "require",
    "exports",
    'app/component/block/block-image-carousel/BlockImageCarouselController',
    'app/component/block/block-image-carousel/BlockImageCarouselViewModel',
    'text!app/component/block/block-image-carousel/block-image-carousel.html'
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
