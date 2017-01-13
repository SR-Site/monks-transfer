define([
    "require",
    "exports",
    'app/component/slideout-panel/global-slideout-panel/contact/ContactController',
    'app/component/slideout-panel/global-slideout-panel/contact/ContactViewModel',
    'text!app/component/slideout-panel/global-slideout-panel/contact/contact.html'
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
