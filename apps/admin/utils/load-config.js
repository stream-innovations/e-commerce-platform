"use strict";
exports.__esModule = true;
exports.loadConfig = void 0;
var medusa_core_utils_1 = require("medusa-core-utils");
var loadConfig = function () {
    var _a, _b, _c, _d;
    var configModule = (0, medusa_core_utils_1.getConfigFile)(process.cwd(), "medusa-config").configModule;
    var plugin = configModule.plugins.find(function (p) {
        return (typeof p === "string" && p === "@medusajs/admin") ||
            (typeof p === "object" && p.resolve === "@medusajs/admin");
    });
    var defaultConfig = {
        serve: true,
        autoRebuild: false,
        path: "app"
    };
    if (typeof plugin !== "string") {
        var options = plugin.options;
        defaultConfig = {
            serve: (_a = options.serve) !== null && _a !== void 0 ? _a : defaultConfig.serve,
            autoRebuild: (_b = options.autoRebuild) !== null && _b !== void 0 ? _b : defaultConfig.autoRebuild,
            path: (_c = options.path) !== null && _c !== void 0 ? _c : defaultConfig.path,
            outDir: (_d = options.outDir) !== null && _d !== void 0 ? _d : defaultConfig.outDir
        };
    }
    return defaultConfig;
};
exports.loadConfig = loadConfig;
