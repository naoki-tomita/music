import { Database } from "./SQLite";
export interface MusicEntity {
    id: number;
    name: string;
    filePath: string;
    albumId: number;
    artistId: number;
}
export declare class MusicDriver {
    database: Database;
    getAll(): Promise<MusicEntity[]>;
    findByAlbumId(id: number): Promise<MusicEntity[]>;
    findByArtistId(id: number): Promise<MusicEntity[]>;
}
//# sourceMappingURL=Music.d.ts.map