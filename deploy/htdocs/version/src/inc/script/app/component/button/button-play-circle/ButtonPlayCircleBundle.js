define([
    "require",
    "exports",
    'app/component/button/button-play-circle/ButtonPlayCircleController',
    'app/component/button/button-play-circle/ButtonPlayCircleViewModel',
    'text!app/component/button/button-play-circle/button-play-circle.html'
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
