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
exports.Artist = void 0;
var automated_omusubi_1 = require("automated-omusubi");
var Music_1 = require("../drivers/Music");
var Artist_1 = require("../drivers/Artist");
var Album_1 = require("../drivers/Album");
var Artist = /** @class */ (function () {
    function Artist() {
    }
    Artist.prototype.getAll = function () {
        return this.artist.getAll();
    };
    Artist.prototype.getArtist = function (id) {
        return this.artist.findById(id);
    };
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Music_1.MusicDriver)
    ], Artist.prototype, "music", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Artist_1.ArtistDriver)
    ], Artist.prototype, "artist", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Album_1.AlbumDriver)
    ], Artist.prototype, "album", void 0);
    Artist = __decorate([
        automated_omusubi_1.named
    ], Artist);
    return Artist;
}());
exports.Artist = Artist;
//# sourceMappingURL=Artist.js.map