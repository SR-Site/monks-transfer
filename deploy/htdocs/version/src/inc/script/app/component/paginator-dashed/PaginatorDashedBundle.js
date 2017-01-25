define([
    "require",
    "exports",
    'app/component/paginator-dashed/PaginatorDashedController',
    'app/component/paginator-dashed/PaginatorDashedViewModel',
    'text!app/component/paginator-dashed/paginator-dashed.html'
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
