import { named, binding } from "automated-omusubi";
import { Database } from "./SQLite";
import { select } from "sql-query-factory";
import { Album } from "../generated/graphql";

export interface AlbumEntity {
  id: number;
  name: string;
  artist_id: number;
}

@named
export class AlbumDriver {
  @binding
  database!: Database;

  getAll() {
    return this.database.all<AlbumEntity>(
      select("*").from<AlbumEntity>("album").build()
    );
  }

  findById(id: number): Promise<AlbumEntity | undefined> {
    return this.database.get(
      select("*").from<AlbumEntity>("album").where("id").equal(id).build()
    );
  }

  findByArtistId(id: number) {
    return this.database.get(
      select("*").from<AlbumEntity>("album").where("artist_id").equal(id).build()
    );
  }
}
