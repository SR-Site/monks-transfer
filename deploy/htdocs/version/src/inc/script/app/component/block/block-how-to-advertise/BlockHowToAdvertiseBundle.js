define([
    "require",
    "exports",
    'app/component/block/block-how-to-advertise/BlockHowToAdvertiseController',
    'app/component/block/block-how-to-advertise/BlockHowToAdvertiseViewModel',
    'text!app/component/block/block-how-to-advertise/block-how-to-advertise.html'
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
