define([
    "require",
    "exports",
    'app/component/block/block-hero-secondary/BlockHeroSecondaryController',
    'app/component/block/block-hero-secondary/BlockHeroSecondaryViewModel',
    'text!app/component/block/block-hero-secondary/block-hero-secondary.html'
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
