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
exports.Album = void 0;
var automated_omusubi_1 = require("automated-omusubi");
var Music_1 = require("../drivers/Music");
var Artist_1 = require("../drivers/Artist");
var Album_1 = require("../drivers/Album");
var Album = /** @class */ (function () {
    function Album() {
    }
    Album.prototype.getAll = function () {
        return this.album.getAll();
    };
    Album.prototype.getAlbum = function (id) {
        return this.album.findById(id);
    };
    Album.prototype.findByArtistId = function (artistId) {
        return this.album.findByArtistId(artistId);
    };
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Music_1.MusicDriver)
    ], Album.prototype, "music", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Artist_1.ArtistDriver)
    ], Album.prototype, "artist", void 0);
    __decorate([
        automated_omusubi_1.binding,
        __metadata("design:type", Album_1.AlbumDriver)
    ], Album.prototype, "album", void 0);
    Album = __decorate([
        automated_omusubi_1.named
    ], Album);
    return Album;
}());
exports.Album = Album;
//# sourceMappingURL=Album.js.map