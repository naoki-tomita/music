import { read } from "node-id3";
import { readdir, stat, readFile, Stats } from "fs";
import { join, basename, extname } from "path";
import { Database } from "../src/scripts/drivers/SQLite";
import { directories } from "./settings.json";
import { createTable, insertInto, select } from "sql-query-factory";
import { MusicEntity } from "../src/scripts/drivers/Music";
import { AlbumEntity } from "../src/scripts/drivers/Album";
import { ArtistEntity } from "../src/scripts/drivers/Artist";
import { binding } from "automated-omusubi";

const EXTS = ["mp3", "m4a", "mp4"];

function readdirAsync(path: string) {
  return new Promise<string[]>((ok, ng) => readdir(path, (err, files) => (err ? ng(err) : ok(files))));
}

function statAsync(path: string) {
  return new Promise<Stats>((ok, ng) => stat(path, (err, files) => (err ? ng(err) : ok(files))));
}

function readFileAsync(path: string) {
  return new Promise<Buffer>((ok, ng) => readFile(path, (err, data) => (err ? ng(err) : ok(data))));
}

async function listMp3(path: string): Promise<string[]> {
  const result: string[] = [];
  for (const item of await readdirAsync(path)) {
    const filePath = join(path, item);
    const stat = await statAsync(filePath);
    if (stat.isDirectory()) {
      result.push(...await listMp3(filePath));
    } else if (EXTS.some(it => item.endsWith(it))) {
      result.push(filePath);
    }
  }
  return result;
}

function isString(value?: string): value is string {
  return typeof value === "string";
}

function isNullish(value: any | undefined): value is (undefined | null) {
  return value == null;
}

class DB {
  @binding
  db!: Database

  async createTables() {
    await this.db.exec(
      createTable<MusicEntity>("music").ifNotExist()
        .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
        .column("name").type("TEXT").notNull()
        .column("filePath").type("TEXT")
        .column("albumId").type("INTEGER")
        .column("artistId").type("INTEGER")
        .build()
    );
    await this.db.exec(
      createTable<AlbumEntity>("album").ifNotExist()
        .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
        .column("name").type("TEXT").notNull()
        .column("artistId").type("INTEGER")
        .build()
    );
    await this.db.exec(
      createTable<ArtistEntity>("artist").ifNotExist()
        .column("id").type("INTEGER").primaryKey().autoIncrement().notNull().unique()
        .column("name").type("TEXT").notNull()
        .build()
    );
  }

  async findArtistByName(name: string): Promise<ArtistEntity | undefined> {
    return (await this.db.get<ArtistEntity>(select("*").from<ArtistEntity>("artist").where("name").equal(name).build()));
  }

  async createArtistIfNotExist(name: string): Promise<number> {
    const artist = await this.findArtistByName(name);
    if (artist) {
      return artist.id;
    }
    await this.db.exec(insertInto<ArtistEntity>("artist").keys("name").values(name).build());
    return (await this.findArtistByName(name))!.id;
  }

  async findAlbumByNameAndArtistId(name: string, artistId?: number): Promise<AlbumEntity | undefined> {
    return (await this.db.get<AlbumEntity>(select("*").from<AlbumEntity>("album")
      .where("name").equal(name)
      .and("artistId").equal(artistId)
      .build()));
  }

  async createAlbumIfNotExist(name: string, artistId?: number): Promise<number> {
    const album = await this.findAlbumByNameAndArtistId(name, artistId);
    if (album) {
      return album.id;
    }
    await this.db.exec(insertInto<AlbumEntity>("album")
      .keys("name", "artistId")
      .values(name, artistId)
      .build());
    return (await this.findAlbumByNameAndArtistId(name, artistId))!.id;
  }

  async createMusicIfNotExist(name: string, filePath: string, albumId?: number, artistId?: number) {
    let findBy = select("*").from<MusicEntity>("music")
      .where("filePath").equal(filePath);
    const music = await this.db.get(findBy.build());
    if (music) {
      return;
    }

    const keys = ["name", "filePath", artistId != null ? "artistId": undefined, albumId != null? "albumId": undefined].filter(isString) as any[];
    const values = [name, filePath, artistId != null ? artistId: undefined, albumId != null? albumId: undefined].filter(it => !isNullish(it)) as any[]
    await this.db.exec(insertInto<MusicEntity>("music")
      .keys(...keys)
      .values(...values)
      .build()
    );
  }
}

async function main() {
  const db = new DB();
  await db.createTables();

  for (const directory of directories.map(it => it.replace("~", process.env["HOME"]||"/"))) {
    try {
      for (const file of await listMp3(directory)) {
        const buf = await readFileAsync(file);
        const metadata = read(buf);
        if (metadata) {
          let artistId = undefined;
          if (metadata.artist) {
            artistId = await db.createArtistIfNotExist(metadata.artist);
          }
          let albumId = undefined;
          if (metadata.album) {
            albumId = await db.createAlbumIfNotExist(metadata.album, artistId);
          }
          await db.createMusicIfNotExist(metadata.title || basename(file, extname(file)), file, albumId, artistId);
        }
      }
    } catch (e) {
      console.error(e.stack);
    }
  }
}

main();
