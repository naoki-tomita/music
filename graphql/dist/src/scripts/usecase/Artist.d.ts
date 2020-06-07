import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";
export declare class Artist {
    music: MusicDriver;
    artist: ArtistDriver;
    album: AlbumDriver;
    getAll(): Promise<import("../drivers/Artist").ArtistEntity[]>;
    getArtist(id: number): Promise<import("../drivers/Artist").ArtistEntity | undefined>;
}
//# sourceMappingURL=Artist.d.ts.map