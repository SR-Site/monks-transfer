define([
    "require",
    "exports",
    'app/component/video-controls/VideoControlsController',
    'app/component/video-controls/VideoControlsViewModel',
    'text!app/component/video-controls/video-controls.html'
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
