define([
    "require",
    "exports",
    'app/component/block/block-hero-main/BlockHeroMainController',
    'app/component/block/block-hero-main/BlockHeroMainViewModel',
    'text!app/component/block/block-hero-main/block-hero-main.html'
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
