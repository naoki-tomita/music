import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { readFile } from "fs";
import { Resolvers } from "./src/scripts/generated/graphql";
import { binding } from "automated-omusubi";
import { Music } from "./src/scripts/usecase/Music";
import { MusicEntity } from "./src/scripts/drivers/Music";
import { Album } from "./src/scripts/usecase/Album";
import { Artist } from "./src/scripts/usecase/Artist";
import { ArtistEntity } from "./src/scripts/drivers/Artist";
import { AlbumEntity } from "./src/scripts/drivers/Album";

function readFileAsync(path: string): Promise<string> {
  return new Promise((ok, ng) => readFile(path, (err, data) => (err ? ng(err): ok(data.toString()))));
}

class GraphQl {
  @binding
  music!: Music;

  @binding
  album!: Album;

  @binding
  artist!: Artist;
}

export async function listen(port: number) {
  const graphql = new GraphQl();
  const resolvers: Resolvers = {
    Query: {
      async albums() {
        return await graphql.album.getAll() as any;
      },
      async musics() {
        return await graphql.music.getMusicList() as any;
      },
      async artists() {
        return await graphql.artist.getAll() as any;
      }
    },
    Music: {
      async album(music) {
        const entity = music as MusicEntity;
        return await graphql.album.getAlbum(entity.album_id) as any;
      },
      async artist(music) {
        const entity = music as MusicEntity;
        return await graphql.artist.getArtist(entity.artist_id) as any;
      }
    },
    Album: {
      async artist(album) {
        const entity = album as unknown as AlbumEntity;
        return await graphql.artist.getArtist(entity.artist_id) as any;
      },
      async musics(album) {
        const entity = album as unknown as AlbumEntity;
        return await graphql.music.findByAlbumId(entity.id) as any;
      }
    },
    Artist: {
      async albums(artist) {
        const entitiy = artist as ArtistEntity;
        return await graphql.album.findByArtistId(entitiy.id) as any;
      },
      async musics(artist) {
        const entitiy = artist as ArtistEntity;
        return await graphql.music.findByArtistId(entitiy.id) as any;
      }
    }
  }

  const typeDefs = gql(await readFileAsync("src/graphql/schema.graphql"))
  const server = new ApolloServer({ typeDefs, resolvers: resolvers as any });

  const app = express();
  server.applyMiddleware({ app, cors: true });
  app.listen(port);
}
