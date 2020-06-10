"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var path_1 = require("path");
var automated_omusubi_1 = require("automated-omusubi");
var Music_1 = require("./src/scripts/usecase/Music");
var Album_1 = require("./src/scripts/usecase/Album");
var Artist_1 = require("./src/scripts/usecase/Artist");
function readFileAsync(path) {
    return new Promise(function (ok, ng) { return fs_1.readFile(path, function (err, data) { return (err ? ng(err) : ok(data.toString())); }); });
}
var GraphQl = /** @class */ (function () {
    function GraphQl() {
    }
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Music_1.Music)
    ], GraphQl.prototype, "music", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Album_1.Album)
    ], GraphQl.prototype, "album", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Artist_1.Artist)
    ], GraphQl.prototype, "artist", void 0);
    return GraphQl;
}());
function listen(port) {
    return __awaiter(this, void 0, void 0, function () {
        var graphql, resolvers, typeDefs, _a, server, app;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    graphql = new GraphQl();
                    resolvers = {
                        Query: {
                            albums: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, graphql.album.getAll()];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                            musics: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, graphql.music.getMusicList()];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                            artists: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, graphql.artist.getAll()];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }
                        },
                        Music: {
                            album: function (music) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entity;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entity = music;
                                                return [4 /*yield*/, graphql.album.getAlbum(entity.albumId)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                            artist: function (music) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entity;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entity = music;
                                                return [4 /*yield*/, graphql.artist.getArtist(entity.artistId)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }
                        },
                        Album: {
                            artist: function (album) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entity;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entity = album;
                                                return [4 /*yield*/, graphql.artist.getArtist(entity.artistId)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                            musics: function (album) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entity;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entity = album;
                                                return [4 /*yield*/, graphql.music.findByAlbumId(entity.id)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }
                        },
                        Artist: {
                            albums: function (artist) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entitiy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entitiy = artist;
                                                return [4 /*yield*/, graphql.album.findByArtistId(entitiy.id)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            },
                            musics: function (artist) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var entitiy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                entitiy = artist;
                                                return [4 /*yield*/, graphql.music.findByArtistId(entitiy.id)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            }
                        }
                    };
                    _a = apollo_server_express_1.gql;
                    return [4 /*yield*/, readFileAsync(path_1.join(__dirname, "src/graphql/schema.graphql"))];
                case 1:
                    typeDefs = _a.apply(void 0, [_b.sent()]);
                    server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
                    app = express_1.default();
                    server.applyMiddleware({ app: app, cors: true });
                    app.listen(port);
                    return [2 /*return*/];
            }
        });
    });
}
exports.listen = listen;
//# sourceMappingURL=index.js.map