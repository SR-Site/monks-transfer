define([
    "require",
    "exports",
    'app/component/map-pagination/MapPaginationController',
    'app/component/map-pagination/MapPaginationViewModel',
    'text!app/component/map-pagination/map-pagination.html'
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
