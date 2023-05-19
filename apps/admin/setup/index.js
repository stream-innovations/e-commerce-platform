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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var admin_ui_1 = require("@medusajs/admin-ui");
var fs_extra_1 = __importDefault(require("fs-extra"));
var ora_1 = __importDefault(require("ora"));
var os_1 = require("os");
var path_1 = require("path");
var utils_1 = require("../utils");
function setupAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, path, outDir, serve, autoRebuild, dir, shouldBuild, _e_1, manifestPath, buildOptions, manifest, _e_2, time, spinner_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = (0, utils_1.loadConfig)(), path = _a.path, outDir = _a.outDir, serve = _a.serve, autoRebuild = _a.autoRebuild;
                    // If the user has not specified that the admin UI should be served,
                    // we should not build it. Furthermore, if the user has not specified that they want
                    // the admin UI to be rebuilt on changes, we should not build it here.
                    if (!serve || !autoRebuild) {
                        return [2 /*return*/];
                    }
                    try {
                        (0, utils_1.validatePath)(path);
                    }
                    catch (err) {
                        utils_1.reporter.panic(err);
                    }
                    shouldBuild = false;
                    /**
                     * If no outDir is provided we default to "build".
                     */
                    if (outDir) {
                        dir = (0, path_1.resolve)(process.cwd(), outDir);
                    }
                    else {
                        dir = (0, path_1.resolve)(process.cwd(), "build");
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_extra_1["default"].ensureDir(dir)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _e_1 = _b.sent();
                    shouldBuild = true;
                    return [3 /*break*/, 4];
                case 4:
                    manifestPath = (0, path_1.resolve)(dir, "build-manifest.json");
                    buildOptions = {
                        build: {
                            outDir: outDir
                        },
                        globals: {
                            base: path,
                            /**
                             * We only build the admin UI as part of the Medusa startup process if
                             * the user has specified that they want to serve the admin UI. When this
                             * is the case, we should always set the backend to `undefined`.
                             */
                            backend: undefined
                        }
                    };
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, fs_extra_1["default"].readJSON(manifestPath)
                        /**
                         * If the manifest is not the same as the current build options,
                         * we should rebuild the admin UI.
                         */
                    ];
                case 6:
                    manifest = _b.sent();
                    /**
                     * If the manifest is not the same as the current build options,
                     * we should rebuild the admin UI.
                     */
                    if (JSON.stringify(manifest) !== JSON.stringify(buildOptions)) {
                        shouldBuild = true;
                    }
                    return [3 /*break*/, 8];
                case 7:
                    _e_2 = _b.sent();
                    /**
                     * If the manifest file does not exist, we should rebuild the admin UI.
                     * This is the case when the admin UI is built for the first time.
                     */
                    shouldBuild = true;
                    return [3 /*break*/, 8];
                case 8:
                    if (!shouldBuild) return [3 /*break*/, 10];
                    time = Date.now();
                    spinner_1 = (0, ora_1["default"])().start("Admin build is out of sync with the current configuration. Rebuild initialized".concat(os_1.EOL));
                    return [4 /*yield*/, (0, admin_ui_1.build)(__assign({}, buildOptions))["catch"](function (err) {
                            spinner_1.fail("Failed to build Admin UI".concat(os_1.EOL));
                            utils_1.reporter.panic(err);
                        })];
                case 9:
                    _b.sent();
                    spinner_1.succeed("Admin UI build - ".concat(Date.now() - time, "ms"));
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = setupAdmin;
