import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";
export declare class Album {
    music: MusicDriver;
    artist: ArtistDriver;
    album: AlbumDriver;
    getAll(): Promise<import("../drivers/Album").AlbumEntity[]>;
    getAlbum(id: number): Promise<import("../drivers/Album").AlbumEntity | undefined>;
    findByArtistId(artistId: number): Promise<unknown>;
}
//# sourceMappingURL=Album.d.ts.map