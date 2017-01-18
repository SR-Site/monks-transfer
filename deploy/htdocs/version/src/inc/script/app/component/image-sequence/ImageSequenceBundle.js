define([
    "require",
    "exports",
    'app/component/image-sequence/ImageSequenceController',
    'app/component/image-sequence/ImageSequenceViewModel',
    'text!app/component/image-sequence/image-sequence.html'
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