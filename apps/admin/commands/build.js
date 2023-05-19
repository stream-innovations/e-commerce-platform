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
var dotenv_1 = __importDefault(require("dotenv"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var ora_1 = __importDefault(require("ora"));
var os_1 = require("os");
var path_1 = require("path");
var utils_1 = require("../utils");
var ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}
try {
    dotenv_1["default"].config({ path: process.cwd() + "/" + ENV_FILE_NAME });
}
catch (e) {
    utils_1.reporter.warn("Failed to load environment variables from ".concat(ENV_FILE_NAME));
}
function build(args) {
    return __awaiter(this, void 0, void 0, function () {
        var deployment, outDirArg, backend, include, includeDist, config, _a, path, outDir, time, spinner, dist, _i, include_1, filePath, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    deployment = args.deployment, outDirArg = args.outDir, backend = args.backend, include = args.include, includeDist = args.includeDist;
                    config = {};
                    if (deployment) {
                        config = {
                            build: {
                                outDir: outDirArg
                            },
                            globals: {
                                backend: backend || process.env.MEDUSA_BACKEND_URL
                            }
                        };
                    }
                    else {
                        _a = (0, utils_1.loadConfig)(), path = _a.path, outDir = _a.outDir;
                        try {
                            (0, utils_1.validatePath)(path);
                        }
                        catch (err) {
                            utils_1.reporter.panic(err);
                        }
                        config = {
                            build: {
                                outDir: outDir
                            },
                            globals: {
                                base: path
                            }
                        };
                    }
                    time = Date.now();
                    spinner = (0, ora_1["default"])().start("Building Admin UI".concat(os_1.EOL));
                    return [4 /*yield*/, (0, admin_ui_1.build)(__assign({}, config))["catch"](function (err) {
                            spinner.fail("Failed to build Admin UI".concat(os_1.EOL));
                            utils_1.reporter.panic(err);
                        })
                        /**
                         * If we have specified files to include in the build, we copy them
                         * to the build directory.
                         */
                    ];
                case 1:
                    _b.sent();
                    if (!(include && include.length > 0)) return [3 /*break*/, 8];
                    dist = outDirArg || (0, path_1.resolve)(process.cwd(), "build");
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 8]);
                    _i = 0, include_1 = include;
                    _b.label = 3;
                case 3:
                    if (!(_i < include_1.length)) return [3 /*break*/, 6];
                    filePath = include_1[_i];
                    return [4 /*yield*/, fs_extra_1["default"].copy(filePath, (0, path_1.resolve)(dist, includeDist, filePath))];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    utils_1.reporter.panic(err_1);
                    return [3 /*break*/, 8];
                case 8:
                    spinner.succeed("Admin UI build - ".concat(Date.now() - time, "ms"));
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = build;
