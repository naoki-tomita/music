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
exports.Database = void 0;
var sqlite3_1 = require("sqlite3");
var automated_omusubi_1 = require("automated-omusubi");
var Database = /** @class */ (function () {
    function Database() {
        this.db = new sqlite3_1.Database("./data.db");
    }
    Database.prototype.exec = function (sql) {
        var _this = this;
        sql = sql.replace("AUTO_INCREMENT", "AUTOINCREMENT");
        return new Promise(function (ok, ng) { return _this.db.exec(sql, function (err) { return (err ? ng(err) : ok()); }); });
    };
    Database.prototype.get = function (sql) {
        var _this = this;
        return new Promise(function (ok, ng) { return _this.db.get(sql, function (err, row) { return (err ? ng(err) : ok(row)); }); });
    };
    Database.prototype.all = function (sql) {
        var _this = this;
        return new Promise(function (ok, ng) { return _this.db.all(sql, function (err, rows) { return (err ? ng(err) : ok(rows)); }); });
    };
    Database = __decorate([
        automated_omusubi_1.named,
        __metadata("design:paramtypes", [])
    ], Database);
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=SQLite.js.map