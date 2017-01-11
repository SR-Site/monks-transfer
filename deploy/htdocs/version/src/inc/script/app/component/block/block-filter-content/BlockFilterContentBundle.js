define([
    "require",
    "exports",
    'app/component/block/block-filter-content/BlockFilterContentController',
    'app/component/block/block-filter-content/BlockFilterContentViewModel',
    'text!app/component/block/block-filter-content/block-filter-content.html'
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
