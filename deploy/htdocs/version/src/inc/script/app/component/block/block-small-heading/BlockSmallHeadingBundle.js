define([
    "require",
    "exports",
    'app/component/block/block-small-heading/BlockSmallHeadingController',
    'app/component/block/block-small-heading/BlockSmallHeadingViewModel',
    'text!app/component/block/block-small-heading/block-small-heading.html'
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
