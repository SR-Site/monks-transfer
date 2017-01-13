define([
    "require",
    "exports",
    'app/component/slideout-panel/global-slideout-panel/GlobalSlideoutPanelController',
    'app/component/slideout-panel/global-slideout-panel/GlobalSlideoutPanelViewModel',
    'text!app/component/slideout-panel/global-slideout-panel/global-slideout-panel.html'
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