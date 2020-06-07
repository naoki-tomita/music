import { Database } from "./SQLite";
export interface MusicEntity {
    id: number;
    name: string;
    album_id: number;
    artist_id: number;
}
export declare class MusicDriver {
    database: Database;
    getAll(): Promise<MusicEntity[]>;
    findByAlbumId(id: number): Promise<MusicEntity[]>;
    findByArtistId(id: number): Promise<MusicEntity[]>;
}
//# sourceMappingURL=Music.d.ts.map