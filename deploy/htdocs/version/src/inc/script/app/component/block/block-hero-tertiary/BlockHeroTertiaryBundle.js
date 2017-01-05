define([
    "require",
    "exports",
    'app/component/block/block-hero-tertiary/BlockHeroTertiaryController',
    'app/component/block/block-hero-tertiary/BlockHeroTertiaryViewModel',
    'text!app/component/block/block-hero-tertiary/block-hero-tertiary.html'
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
