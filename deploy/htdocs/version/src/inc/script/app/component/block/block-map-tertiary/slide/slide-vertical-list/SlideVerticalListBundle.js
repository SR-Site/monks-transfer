define([
    "require",
    "exports",
    'app/component/block/block-map-tertiary/slide/slide-vertical-list/SlideVerticalListController',
    'app/component/block/block-map-tertiary/slide/slide-vertical-list/SlideVerticalListViewModel',
    'text!app/component/block/block-map-tertiary/slide/slide-vertical-list/slide-vertical-list.html'
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
