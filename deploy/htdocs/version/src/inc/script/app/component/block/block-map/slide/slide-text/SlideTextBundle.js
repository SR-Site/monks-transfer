define([
    "require",
    "exports",
    'app/component/block/block-map/slide/slide-text/SlideTextController',
    'app/component/block/block-map/slide/slide-text/SlideTextViewModel',
    'text!app/component/block/block-map/slide/slide-text/slide-text.html'
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
