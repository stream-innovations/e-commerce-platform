"use strict";
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
exports.createCli = void 0;
var commander_1 = require("commander");
var build_1 = __importDefault(require("./build"));
var dev_1 = __importDefault(require("./dev"));
var eject_1 = __importDefault(require("./eject"));
function createCli() {
    return __awaiter(this, void 0, void 0, function () {
        var program, buildCommand, devCommand, deployCommand;
        return __generator(this, function (_a) {
            program = new commander_1.Command();
            buildCommand = program.command("build");
            buildCommand.description("Build the admin dashboard");
            buildCommand.option("--deployment", "Build for deploying to and external host (e.g. Vercel)");
            buildCommand.option("-o, --out-dir <path>", "Output directory");
            buildCommand.option("-b, --backend <url>", "Backend URL");
            buildCommand.option("-i, --include [paths...]]", "Paths to files that should be included in the build");
            buildCommand.option("-d, --include-dist <path>", "Path to where the files specified in the include option should be placed. Relative to the root of the build directory.");
            buildCommand.action(build_1["default"]);
            devCommand = program.command("dev");
            devCommand.description("Start the admin dashboard in development mode");
            devCommand.option("-p, --port <port>", "Port (default: 7001))");
            devCommand.option("-b, --backend <url>", "Backend URL (default http://localhost:9000)");
            devCommand.action(dev_1["default"]);
            deployCommand = program.command("eject");
            deployCommand.description("Eject the admin dashboard source code to a custom directory");
            deployCommand.option("-o, --out-dir <path>", "Output directory");
            deployCommand.action(eject_1["default"]);
            return [2 /*return*/, program];
        });
    });
}
exports.createCli = createCli;
