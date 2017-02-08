define([
    "require",
    "exports",
    'app/component/notification/NotificationController',
    'app/component/notification/NotificationViewModel',
    'text!app/component/notification/notification.html'
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