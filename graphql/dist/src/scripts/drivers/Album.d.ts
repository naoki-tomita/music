import { Database } from "./SQLite";
export interface AlbumEntity {
    id: number;
    name: string;
    artist_id: number;
}
export declare class AlbumDriver {
    database: Database;
    getAll(): Promise<AlbumEntity[]>;
    findById(id: number): Promise<AlbumEntity | undefined>;
    findByArtistId(id: number): Promise<unknown>;
}
//# sourceMappingURL=Album.d.ts.map