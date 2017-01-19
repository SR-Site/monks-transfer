define([
    "require",
    "exports",
    'app/component/image-crossfader/ImageCrossfaderController',
    'app/component/image-crossfader/ImageCrossfaderViewModel',
    'text!app/component/image-crossfader/image-crossfader.html'
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
