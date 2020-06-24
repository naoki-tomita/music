import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { DisplayMode } from "./Actions/App";
import { usePlayer } from "./Actions/Player";
import { useApp } from "./Actions/App";
import { faPlay, faBackward, faStop, faPause, faForward, faMusic, faImages, faMale } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconButton, Nav, NavItem, ShadowInset, Dropdown, ProgressBar } from "./Neumophism";
import { classNames, secondToMinuteString } from "./Utils";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";


const { useState } = React;

const Grid = styled.div<{ width: number }>`
        display: grid;
        grid-template-areas: "a a a"
                             "b sliderh c"
                             "footer footer footer";
        grid-template-rows: 96px
                            1fr
                            16px;
        grid-template-columns: ${({ width }) => width}px 1px 1fr;
        height: 100vh;
`;
const GridArea = styled.div<{ name: string }>`
  grid-area: ${({ name }) => name};
`;


export const App: React.FC = () => {
  const [state, setState] = useState<{
    width: number;
    dragHorizontal: boolean;
  }>({
    width: 200,
    dragHorizontal: false,
  });

  function dragStart() {
    setState({
      ...state,
      dragHorizontal: true,
    });
  }

  function onDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setState({
      ...state,
      width: Math.max(state.dragHorizontal ? e.clientX : state.width, 80),
    });
  }

  function dragEnd() {
    setState({ ...state, dragHorizontal: false })
  }

  return (
    <>
    <Grid
      width={state.width}
      onMouseMove={state.dragHorizontal ? onDrag : undefined}
      onMouseUp={state.dragHorizontal ? dragEnd : undefined}
    >
      <GridArea name="a"><Player /></GridArea>
      <GridArea name="b"><Sidebar /></GridArea>
      <div className="slider-wrapper">
        <div onMouseDown={dragStart} className="slider"></div>
        <div onMouseDown={dragStart} className="slider-highlight"></div>
      </div>
      <ShadowInset style={{ gridArea: "c", overflow: "scroll", position: "relative", top: 0, bottom: 0, margin: "0 16px" }}>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
      </ShadowInset>
    </Grid>
    </>
  );
}

const Sidebar: React.FC = () => {
  const { displayMode, setDisplayMode } = useApp();

  const Link: React.FC<{ type: DisplayMode, label: string, icon: IconProp }> = ({ type, label, icon }) => {
    return <NavItem label={label} active={type === displayMode} onClick={() => (setDisplayMode(type))} icon={icon}/>
  }

  return (
    <div style={{ padding: "0 16px" }}>
      <Nav>
        <Link type="music" icon={faMusic} label="Music" />
        <Link type="artist" icon={faMale} label="Artist" />
        <Link type="album" icon={faImages} label="Album" />
      </Nav>
    </div>
  );
}

const Player: React.FC = () => {
  const {
    next, prev, play, stop, pause, jump,
    playing, hasNext, hasPrev, current, afterSongs, playlist, duration, currentTime
  } = usePlayer();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", userSelect: "none", padding: 16 }}>
      <div style={{ flex: 1, minWidth: 216 }}>
        <IconButton style={{ marginRight: 16 }} disabled={!hasPrev} onClick={prev} icon={faBackward} />
        <IconButton style={{ marginRight: 16 }} onClick={stop} icon={faStop} />
        {playing
          ? <IconButton style={{ marginRight: 16 }} onClick={pause} icon={faPause} />
          : <IconButton style={{ marginRight: 16 }} onClick={play} icon={faPlay} />}
        <IconButton disabled={!hasNext} onClick={next} icon={faForward} />
      </div>
      <ShadowInset style={{ padding: 16, height: 64, width: 420, marginRight: 16 }}>
        <ProgressBar label={current ? `Now Playing - ${current.name}`: "-"} progress={secondToMinuteString(currentTime)} percentage={(currentTime/duration)*100} />
      </ShadowInset>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Dropdown
          items={current ? [
            ...[({ label: `Now Playing - ${current.name}`, id: current.id })],
            null,
            ...afterSongs.map(it => ({ label: it.name, id: it.id })),
          ] : []}
          onClick={item => jump(playlist.findIndex(it => it.id === item.id))}
        />
      </div>
    </div>
  );
}

const Main: React.FC = () => {
  const { displayMode } = useApp();
  if (displayMode === "music") {
    return <MusicList />;
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

const client = new ApolloClient({ uri: "http://localhost:8080/graphql" });

const MusicList: React.FC = () => {
  const [state, setState] = useState<MusicListState>({ selectedMusicId: null });
  const { loading, data, error } = useQuery<{ musics: MusicResult[] }>(MusicQuery);
  const { current, push } = usePlayer();
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>{error.message}{error.stack}</div>
  }
  return (
    <table className="table table-hover" style={{ width: "100%", height: "100%", userSelect: "none", marginBottom: 0 }}>
      <thead>
        <tr>
          <th style={{ width: 72, fontWeight: "bold", textAlign: "center" }}></th>
          <th>title</th>
          <th>artist</th>
          <th>album</th>
        </tr>
      </thead>
      <tbody>
      {data?.musics.map(it =>
        <tr
          key={it.filePath}
          className={classNames({ selected: state?.selectedMusicId === it.id })}
          onDoubleClick={() => push(it)}
          onClick={() => setState({ selectedMusicId: it.id })}
        >
          <td style={{ textAlign: "center" }}>{it.id === current?.id ? "♪" : ""}</td>
          <td>{it.name}</td>
          <td>{it.artist.name}</td>
          <td>{it.album.name}</td>
        </tr>
      )}
      </tbody>
    </table>
  );
}

const AlbumList: React.FC = () => {
  const { loading, data, error } = useQuery<{ albums: AlbumResult[] }>(AlbumQuery);
  const { current } = usePlayer();
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
