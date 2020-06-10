#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_id3_1 = require("node-id3");
var fs_1 = require("fs");
var path_1 = require("path");
var SQLite_1 = require("../src/scripts/drivers/SQLite");
var settings_json_1 = require("./settings.json");
var sql_query_factory_1 = require("sql-query-factory");
var automated_omusubi_1 = require("automated-omusubi");
var EXTS = ["mp3", "m4a", "mp4"];
function readdirAsync(path) {
    return new Promise(function (ok, ng) { return fs_1.readdir(path, function (err, files) { return (err ? ng(err) : ok(files)); }); });
}
function statAsync(path) {
    return new Promise(function (ok, ng) { return fs_1.stat(path, function (err, files) { return (err ? ng(err) : ok(files)); }); });
}
function readFileAsync(path) {
    return new Promise(function (ok, ng) { return fs_1.readFile(path, function (err, data) { return (err ? ng(err) : ok(data)); }); });
}
function listMp3(path) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _loop_1, _i, _a, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = [];
                    _loop_1 = function (item) {
                        var filePath, stat_1, _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    filePath = path_1.join(path, item);
                                    return [4 /*yield*/, statAsync(filePath)];
                                case 1:
                                    stat_1 = _d.sent();
                                    if (!stat_1.isDirectory()) return [3 /*break*/, 3];
                                    _b = (_a = result.push).apply;
                                    _c = [result];
                                    return [4 /*yield*/, listMp3(filePath)];
                                case 2:
                                    _b.apply(_a, _c.concat([_d.sent()]));
                                    return [3 /*break*/, 4];
                                case 3:
                                    if (EXTS.some(function (it) { return item.endsWith(it); })) {
                                        result.push(filePath);
                                    }
                                    _d.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0;
                    return [4 /*yield*/, readdirAsync(path)];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    item = _a[_i];
                    return [5 /*yield**/, _loop_1(item)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, result];
            }
        });
    });
}
function isString(value) {
    return typeof value === "string";
}
function isNullish(value) {
    return value == null;
}
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.prototype.createTables = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.exec(sql_query_factory_1.createTable("music").ifNotExist()
                            .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
                            .column("name").type("TEXT").notNull()
                            .column("filePath").type("TEXT")
                            .column("albumId").type("INTEGER")
                            .column("artistId").type("INTEGER")
                            .build())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.db.exec(sql_query_factory_1.createTable("album").ifNotExist()
                                .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
                                .column("name").type("TEXT").notNull()
                                .column("artistId").type("INTEGER")
                                .build())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.db.exec(sql_query_factory_1.createTable("artist").ifNotExist()
                                .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
                                .column("name").type("TEXT").notNull()
                                .build())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DB.prototype.findArtistByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.get(sql_query_factory_1.select("*").from("artist").where("name").equal(name).build())];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    DB.prototype.createArtistIfNotExist = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var artist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findArtistByName(name)];
                    case 1:
                        artist = _a.sent();
                        if (artist) {
                            return [2 /*return*/, artist.id];
                        }
                        return [4 /*yield*/, this.db.exec(sql_query_factory_1.insertInto("artist").keys("name").values(name).build())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findArtistByName(name)];
                    case 3: return [2 /*return*/, (_a.sent()).id];
                }
            });
        });
    };
    DB.prototype.findAlbumByNameAndArtistId = function (name, artistId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.get(sql_query_factory_1.select("*").from("album")
                            .where("name").equal(name)
                            .and("artistId").equal(artistId)
                            .build())];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    DB.prototype.createAlbumIfNotExist = function (name, artistId) {
        return __awaiter(this, void 0, void 0, function () {
            var album;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findAlbumByNameAndArtistId(name, artistId)];
                    case 1:
                        album = _a.sent();
                        if (album) {
                            return [2 /*return*/, album.id];
                        }
                        return [4 /*yield*/, this.db.exec(sql_query_factory_1.insertInto("album")
                                .keys("name", "artistId")
                                .values(name, artistId)
                                .build())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findAlbumByNameAndArtistId(name, artistId)];
                    case 3: return [2 /*return*/, (_a.sent()).id];
                }
            });
        });
    };
    DB.prototype.createMusicIfNotExist = function (name, filePath, albumId, artistId) {
        return __awaiter(this, void 0, void 0, function () {
            var findBy, music, keys, values;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        findBy = sql_query_factory_1.select("*").from("music")
                            .where("filePath").equal(filePath);
                        return [4 /*yield*/, this.db.get(findBy.build())];
                    case 1:
                        music = _c.sent();
                        if (music) {
                            return [2 /*return*/];
                        }
                        keys = ["name", "filePath", artistId != null ? "artistId" : undefined, albumId != null ? "albumId" : undefined].filter(isString);
                        values = [name, filePath, artistId != null ? artistId : undefined, albumId != null ? albumId : undefined].filter(function (it) { return !isNullish(it); });
                        return [4 /*yield*/, this.db.exec((_a = (_b = sql_query_factory_1.insertInto("music")).keys.apply(_b, keys)).values.apply(_a, values).build())];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", SQLite_1.Database)
    ], DB.prototype, "db", void 0);
    return DB;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, _a, directory, _b, _c, file, buf, metadata, artistId, albumId, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    db = new DB();
                    return [4 /*yield*/, db.createTables()];
                case 1:
                    _d.sent();
                    _i = 0, _a = settings_json_1.directories.map(function (it) { return it.replace("~", process.env["HOME"] || "/"); });
                    _d.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 16];
                    directory = _a[_i];
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 14, , 15]);
                    _b = 0;
                    return [4 /*yield*/, listMp3(directory)];
                case 4:
                    _c = _d.sent();
                    _d.label = 5;
                case 5:
                    if (!(_b < _c.length)) return [3 /*break*/, 13];
                    file = _c[_b];
                    return [4 /*yield*/, readFileAsync(file)];
                case 6:
                    buf = _d.sent();
                    metadata = node_id3_1.read(buf);
                    if (!metadata) return [3 /*break*/, 12];
                    artistId = undefined;
                    if (!metadata.artist) return [3 /*break*/, 8];
                    return [4 /*yield*/, db.createArtistIfNotExist(metadata.artist)];
                case 7:
                    artistId = _d.sent();
                    _d.label = 8;
                case 8:
                    albumId = undefined;
                    if (!metadata.album) return [3 /*break*/, 10];
                    return [4 /*yield*/, db.createAlbumIfNotExist(metadata.album, artistId)];
                case 9:
                    albumId = _d.sent();
                    _d.label = 10;
                case 10: return [4 /*yield*/, db.createMusicIfNotExist(metadata.title || path_1.basename(file, path_1.extname(file)), file, albumId, artistId)];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12:
                    _b++;
                    return [3 /*break*/, 5];
                case 13: return [3 /*break*/, 15];
                case 14:
                    e_1 = _d.sent();
                    console.error(e_1.stack);
                    return [3 /*break*/, 15];
                case 15:
                    _i++;
                    return [3 /*break*/, 2];
                case 16: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=batch.js.map
