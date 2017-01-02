define([
    "require",
    "exports",
    'app/component/block/block-image-call-to-actions/BlockImageCallToActionsController',
    'app/component/block/block-image-call-to-actions/BlockImageCallToActionsViewModel',
    'text!app/component/block/block-image-call-to-actions/block-image-call-to-actions.html'
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
