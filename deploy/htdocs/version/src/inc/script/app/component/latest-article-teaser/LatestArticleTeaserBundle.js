define([
    "require",
    "exports",
    'app/component/latest-article-teaser/LatestArticleTeaserController',
    'app/component/latest-article-teaser/LatestArticleTeaserViewModel',
    'text!app/component/latest-article-teaser/latest-article-teaser.html'
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
