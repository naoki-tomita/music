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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumDriver = void 0;
var automated_omusubi_1 = require("automated-omusubi");
var SQLite_1 = require("./SQLite");
var sql_query_factory_1 = require("sql-query-factory");
var AlbumDriver = /** @class */ (function () {
    function AlbumDriver() {
    }
    AlbumDriver.prototype.getAll = function () {
        return this.database.all(sql_query_factory_1.select("*").from("album").build());
    };
    AlbumDriver.prototype.findById = function (id) {
        return this.database.get(sql_query_factory_1.select("*").from("album").where("id").equal(id).build());
    };
    AlbumDriver.prototype.findByArtistId = function (id) {
        return this.database.get(sql_query_factory_1.select("*").from("album").where("artist_id").equal(id).build());
    };
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", SQLite_1.Database)
    ], AlbumDriver.prototype, "database", void 0);
    AlbumDriver = __decorate([
        automated_omusubi_1.named
    ], AlbumDriver);
    return AlbumDriver;
}());
exports.AlbumDriver = AlbumDriver;
//# sourceMappingURL=Album.js.map