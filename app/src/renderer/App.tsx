import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { DisplayMode } from "./Actions/App";
import { useContext } from "./Actions";
import { usePlayer } from "./Actions/Player";
const { useState } = React;

export const App: React.FC = () => {
  const [state, setState] = useState<{
    width: number;
    height: number;
    dragHorizontal: boolean;
    dragVertical: boolean;
    x: number;
    y: number;
  }>({
    width: 120,
    height: 40,
    dragHorizontal: false,
    dragVertical: false,
    x: -1,
    y: -1,
  });

  function dragStart(vertical: boolean) {
    return function(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      console.log(vertical);
      setState({
        ...state,
        x: e.clientX,
        y: e.clientY,
        dragHorizontal: !vertical,
        dragVertical: vertical
      });
    }
  }

  function onDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setState({
      ...state,
      x: e.clientX,
      y: e.clientY,
      width: Math.max(state.width - (state.dragHorizontal ? (state.x - e.clientX) : 0), 80),
      height: Math.max(state.height - (state.dragVertical ? (state.y - e.clientY) : 0), 20),
    });
  }

  function dragEnd() {
    setState({ ...state, dragHorizontal: false, dragVertical: false })
  }

  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `"a a a"
                            "sliderv sliderv sliderv"
                            "b sliderh c"`,
        gridTemplateRows: `${state.height}px
                          3px
                          1fr`,
        gridTemplateColumns: `${state.width}px 3px 1fr`,
        height: "100vh",
      }}
      onMouseMove={state.dragHorizontal || state.dragVertical ? onDrag : undefined}
      onMouseUp={state.dragHorizontal || state.dragVertical ? dragEnd : undefined}
    >
      <div style={{ gridArea: "a" }}><Player /></div>
      <div onMouseDown={dragStart(true)} style={{ gridArea: "sliderv", backgroundColor: "#eee", cursor: "row-resize" }}></div>
      <div style={{ gridArea: "b" }}><Sidebar /></div>
      <div onMouseDown={dragStart(false)} style={{ gridArea: "sliderh", backgroundColor: "#eee", cursor: "col-resize" }}></div>
      <div style={{ gridArea: "c", overflow: "scroll" }}><Main /></div>
    </div>
    </>
  );
}

const Sidebar: React.FC = () => {
  const { app: { displayMode, setDisplayMode } } = useContext();

  const Link: React.FC<{ type: DisplayMode }> = ({ type, children }) => {
    return type === displayMode
      ? <li>{children}</li>
      : <li><a href="#" onClick={(e) => (console.log(e), setDisplayMode(type))}>{children}</a></li>
  }

  return (
    <ul style={{ userSelect: "none" }}>
      <Link type="music">Music</Link>
      <Link type="artist">Artist</Link>
      <Link type="album">Album</Link>
    </ul>
  );
}

const Player: React.FC = () => {
  const { player: { next, prev, play, stop, pause, playing, hasNext, hasPrev, playlist } } = useContext();
  return (
    <div style={{ display: "flex", justifyContent: "center", userSelect: "none" }}>
      <div>
        <button disabled={!hasPrev} onClick={prev}>{"<<"}</button>
        <button onClick={stop}>{"■"}</button>
        {playing
          ? <button onClick={pause}>{"||"}</button>
          : <button onClick={play}>{"→"}</button>}
        <button disabled={!hasNext} onClick={next}>{">>"}</button>
      </div>
    </div>
  );
}

const Main: React.FC = () => {
  const { app: { displayMode } } = useContext();
  if (displayMode === "music") {
    return <MusicList />
  } else if (displayMode === "album") {
    return <AlbumList />;
  } else if (displayMode === "artist") {
    return <ArtistList />;
  }
  return <div>bug occured.</div>;
}

interface MusicResult {
  id: string;
  name: string;
  filePath: string;
  artist: ArtistResult,
  album: AlbumResult
}

interface ArtistResult {
  name: string;
  albums: AlbumResult[];
  musics: MusicResult[];
}

interface AlbumResult {
  name: string;
  musics: MusicResult[];
  artist: ArtistResult;
}

const MusicQuery = gql`
query {
  musics {
    id
    name
    filePath
    album {
      name
    }
    artist {
      name
    }
  }
}
`;

const ArtistQuery = gql`
query {
  artists {
    name
    albums {
      name
    }
    musics {
      name
    }
  }
}
`;

const AlbumQuery = gql`
query {
  albums {
    name
    musics {
      name
    }
    artist {
      name
    }
  }
}
`;

const Queries = {
  music: MusicQuery,
  album: AlbumQuery,
  artist: ArtistQuery,
} as const;

interface MusicListState {
  selectedMusicId: string | null;
}

const MusicList: React.FC = () => {
  const [state, setState] = useState<MusicListState>({ selectedMusicId: null });
  const { loading, data, error } = useQuery<{ musics: MusicResult[] }>(MusicQuery);
  const { player: { current, push } } = useContext();
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>{error.message}{error.stack}</div>
  }
  return (
    <>
    <table style={{ width: "100%" }}>
      <thead>
        <tr style={{ fontSize: 12, userSelect: "none" }}>
          <th>::</th><th>title</th><th>artist</th><th>album</th>
        </tr>
      </thead>
      <tbody>
      {data?.musics.map(it =>
        <tr
          key={it.filePath}
          style={{
            cursor: "pointer",
            fontSize: 12,
            borderBottom: "1px solid #ccc",
            backgroundColor: (state?.selectedMusicId === it.id ? "#eee" : "transparent"),
          }}
          onDoubleClick={() => push(it)}
          onClick={() => setState({ selectedMusicId: it.id })}
        >
          <td style={{ userSelect: "none", width: 20, textAlign: "center" }} >{it.id === current?.id ? "♪" : ""}</td>
          <td style={{ userSelect: "none", borderLeft: "1px solid #ccc", padding: "4px 8px" }}>{it.name}</td>
          <td style={{ userSelect: "none", borderLeft: "1px solid #ccc", padding: "4px 8px" }}>{it.artist.name}</td>
          <td style={{ userSelect: "none", borderLeft: "1px solid #ccc", padding: "4px 8px" }}>{it.album.name}</td>
        </tr>
      )}
      </tbody>
    </table>
    </>
  );
}

const AlbumList: React.FC = () => {
  const { loading, data, error } = useQuery<{ albums: AlbumResult[] }>(AlbumQuery);
  const { player: { current } } = useContext();
  if (loading) {
    return <div>loading...</div>
  }
  console.log(data, error);
  if (error) {
    return <div>{error.message}{error.stack}</div>
  }
  return (
    <ul style={{ display: "flex" }}>
      {data?.albums.map((it, i) =>
        <li key={i}>
          <div>{it.name}</div><div>{it.artist.name}</div>
        </li>
      )}
    </ul>
  );
}

const ArtistList: React.FC = () => {
  const { loading, data, error } = useQuery<{ artists: ArtistResult[] }>(ArtistQuery);
  if (loading) {
    return <div>loading...</div>;
  }
  console.log(error, data)
  if (error) {
    return <div>{error.message}{error.stack}</div>;
  }
  return (
    <ul>
      {data?.artists.map((it, i) =>
        <li key={i} style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
          <div>{it.name}</div>
        </li>
      )}
    </ul>
  );
}
