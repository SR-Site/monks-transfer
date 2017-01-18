define([
    "require",
    "exports",
    'app/component/block/block-audio-fragment/BlockAudioFragmentController',
    'app/component/block/block-audio-fragment/BlockAudioFragmentViewModel',
    'text!app/component/block/block-audio-fragment/block-audio-fragment.html'
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
