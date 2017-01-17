define([
    "require",
    "exports",
    'app/component/video-player/VideoPlayerController',
    'app/component/video-player/VideoPlayerViewModel',
    'text!app/component/video-player/video-player.html'
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