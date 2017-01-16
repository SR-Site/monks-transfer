define([
    "require",
    "exports",
    'app/component/block/block-article-teaser/BlockArticleTeaserController',
    'app/component/block/block-article-teaser/BlockArticleTeaserViewModel',
    'text!app/component/block/block-article-teaser/block-article-teaser.html'
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
