import { named, binding } from "automated-omusubi";
import { Database } from "./SQLite";
import { select } from "sql-query-factory";
import { Artist } from "../generated/graphql";

export interface ArtistEntity {
  id: number;
  name: string;
}

@named
export class ArtistDriver {
  @binding
  database!: Database;

  getAll() {
    return this.database.all<ArtistEntity>(
      select("*").from<ArtistEntity>("artist").build()
    );
  }

  findById(id: number): Promise<ArtistEntity | undefined> {
    return this.database.get(
      select("*").from<ArtistEntity>("artist").where("id").equal(id).build()
    );
  }
}
