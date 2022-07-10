"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    var classify = schematics_1.strings.classify, dasherize = schematics_1.strings.dasherize;
    return function (tree, context) {
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)('../schematics-templates/dialog'), [
            // pass our options variables to the template.
            (0, schematics_1.template)(__assign(__assign({}, options), { classify: classify, dasherize: dasherize })),
            (0, schematics_1.move)("./src/components/dialogs/".concat(options.name, "/"))
        ]);
        return (0, schematics_1.mergeWith)(templateSource)(tree, context);
        // tree.create(`./src/components/dialogs/${_options.name}/${_options.name}-dialog.tsx`, "// TODO: implement tsx");
        // tree.create(`./src/components/dialogs/${_options.name}/${_options.name}-dialog.module.css`, "/* TODO: implement styles */");
        // return tree;
    };
}
exports["default"] = default_1;
