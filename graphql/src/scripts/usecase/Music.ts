import { named, binding } from "automated-omusubi";
import { MusicDriver } from "../drivers/Music";
import { ArtistDriver } from "../drivers/Artist";
import { AlbumDriver } from "../drivers/Album";

@named
export class Music {
  @binding
  music!: MusicDriver;

  @binding
  artist!: ArtistDriver;

  @binding
  album!: AlbumDriver;

  async getMusicList() {
    return await this.music.getAll();
  }

  async findByAlbumId(albumId: number) {
    return await this.music.findByAlbumId(albumId);
  }

  async findByArtistId(artistId: number) {
    return await this.music.findByArtistId(artistId);
  }
}
