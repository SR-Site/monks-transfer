define([
    "require",
    "exports",
    'app/component/filter-menu/FilterMenuController',
    'app/component/filter-menu/FilterMenuViewModel',
    'text!app/component/filter-menu/filter-menu.html'
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
