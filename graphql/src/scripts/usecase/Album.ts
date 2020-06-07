import { named, binding } from "automated-omusubi";
import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";

@named
export class Album {
  @binding
  music!: MusicDriver;

  @binding
  artist!: ArtistDriver;

  @binding
  album!: AlbumDriver;

  getAll() {
    return this.album.getAll();
  }

  getAlbum(id: number) {
    return this.album.findById(id);
  }

  findByArtistId(artistId: number) {
    return this.album.findByArtistId(artistId);
  }
}
