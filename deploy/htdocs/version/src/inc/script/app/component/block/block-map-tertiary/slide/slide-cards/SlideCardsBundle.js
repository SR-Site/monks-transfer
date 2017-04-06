define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/slide/slide-cards/SlideCardsController',
    'app/component/block/block-map-tertiary/slide/slide-cards/SlideCardsViewModel',
    'text!app/component/block/block-map-tertiary/slide/slide-cards/slide-cards.html'
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
