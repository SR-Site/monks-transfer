define([
    "require",
    "exports",
    'app/component/audio-player/AudioPlayerController',
    'app/component/audio-player/AudioPlayerViewModel',
    'text!app/component/audio-player/audio-player.html'
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
