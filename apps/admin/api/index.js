"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = require("path");
var picocolors_1 = __importDefault(require("picocolors"));
var utils_1 = require("../utils");
function default_1(_rootDirectory, options) {
    var app = (0, express_1.Router)();
    var _a = options.serve, serve = _a === void 0 ? true : _a, _b = options.path, path = _b === void 0 ? "app" : _b, outDir = options.outDir;
    if (serve) {
        var buildPath 
        // If an outDir is provided we use that, otherwise we default to "build".
        = void 0;
        // If an outDir is provided we use that, otherwise we default to "build".
        if (outDir) {
            buildPath = (0, path_1.resolve)(process.cwd(), outDir);
        }
        else {
            buildPath = (0, path_1.resolve)(process.cwd(), "build");
        }
        var htmlPath = (0, path_1.resolve)(buildPath, "index.html");
        /**
         * The admin UI should always be built at this point, but in the
         * rare case that another plugin terminated a previous startup, the admin
         * may not have been built correctly. Here we check if the admin UI
         * build files exist, and if not, we throw an error, providing the
         * user with instructions on how to fix their build.
         */
        var indexExists = fs_extra_1["default"].existsSync(htmlPath);
        if (!indexExists) {
            utils_1.reporter.panic(new Error("Could not find the admin UI build files. Please run ".concat(picocolors_1["default"].bold("`medusa-admin build`"), " or enable ").concat(picocolors_1["default"].bold("autoRebuild"), " in the plugin options to build the admin UI.")));
        }
        var html_1 = fs_extra_1["default"].readFileSync(htmlPath, "utf-8");
        var sendHtml = function (_req, res) {
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Vary", "Origin, Cache-Control");
            res.send(html_1);
        };
        var setStaticHeaders = function (res) {
            res.setHeader("Cache-Control", "max-age=31536000, immutable");
            res.setHeader("Vary", "Origin, Cache-Control");
        };
        app.get("/".concat(path), sendHtml);
        app.use("/".concat(path), express_1["default"].static(buildPath, {
            setHeaders: setStaticHeaders
        }));
        app.get("/".concat(path, "/*"), sendHtml);
    }
    else {
        app.get("/".concat(path), function (_req, res) {
            res.send("Admin not enabled");
        });
    }
    return app;
}
exports["default"] = default_1;
