import { named, binding } from "automated-omusubi";
import { Database } from "./SQLite";
import { select } from "sql-query-factory";
import { Music } from "../generated/graphql";

export interface MusicEntity {
  id: number;
  name: string;
  album_id: number;
  artist_id: number;
}

@named
export class MusicDriver {
  @binding
  database!: Database;

  getAll(): Promise<MusicEntity[]> {
    return this.database.all<MusicEntity>(
      select("*").from<MusicEntity>("music").build()
    );
  }

  findByAlbumId(id: number): Promise<MusicEntity[]> {
    return this.database.all<MusicEntity>(
      select("*").from<MusicEntity>("music")
        .where("album_id").equal(id).build()
    );
  }

  findByArtistId(id: number): Promise<MusicEntity[]> {
    return this.database.all<MusicEntity>(
      select("*").from<MusicEntity>("music")
        .where("artist_id").equal(id).build()
    );
  }
}
