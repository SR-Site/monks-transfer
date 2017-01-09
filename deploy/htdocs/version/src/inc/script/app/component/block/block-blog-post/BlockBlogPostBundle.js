define([
    "require",
    "exports",
    'app/component/block/block-blog-post/BlockBlogPostController',
    'app/component/block/block-blog-post/BlockBlogPostViewModel',
    'text!app/component/block/block-blog-post/block-blog-post.html'
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
