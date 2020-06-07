import { Database } from "./SQLite";
export interface ArtistEntity {
    id: number;
    name: string;
}
export declare class ArtistDriver {
    database: Database;
    getAll(): Promise<ArtistEntity[]>;
    findById(id: number): Promise<ArtistEntity | undefined>;
}
//# sourceMappingURL=Artist.d.ts.map