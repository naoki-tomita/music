import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";
export declare class Music {
    music: MusicDriver;
    artist: ArtistDriver;
    album: AlbumDriver;
    getMusicList(): Promise<import("../drivers/Music").MusicEntity[]>;
    findByAlbumId(albumId: number): Promise<import("../drivers/Music").MusicEntity[]>;
    findByArtistId(artistId: number): Promise<import("../drivers/Music").MusicEntity[]>;
}
//# sourceMappingURL=Music.d.ts.map