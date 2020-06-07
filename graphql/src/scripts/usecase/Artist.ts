import { named, binding } from "automated-omusubi";
import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";

@named
export class Artist {
  @binding
  music!: MusicDriver;

  @binding
  artist!: ArtistDriver;

  @binding
  album!: AlbumDriver;

  getAll() {
    return this.artist.getAll();
  }

  getArtist(id: number) {
    return this.artist.findById(id);
  }
}
