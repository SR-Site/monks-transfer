define([
    "require",
    "exports",
    'app/component/video-overlay/VideoOverlayController',
    'app/component/video-overlay/VideoOverlayViewModel',
    'text!app/component/video-overlay/video-overlay.html'
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
