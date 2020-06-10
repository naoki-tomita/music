import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
const { useState } = React;

const Query = gql`
query {
  musics {
    name
    filePath
  }
}
`;

interface Music {
  name: string;
  filePath: string;
}

interface PlayerState {
  current: Music | null;
  playlist: Music[];
  player: HTMLAudioElement;
}

interface PlayerAction {
  play(): void;
  stop(): void;
  next(): void;
  prev(): void;
  push(music: Music): void;
  remove(music: Music): void;
}

interface PlayerInnerState {
  currentIndex: number;
  playlist: Music[];
}

const player = document.createElement("audio");
document.body.append(player);

function usePlayer(): PlayerAction & PlayerState {
  const [state, setState] = useState<PlayerInnerState>({
    currentIndex: -1,
    playlist: []
  });
  return {
    current: state.playlist[state.currentIndex] || null,
    player,
    playlist: state.playlist,
    play() {
      player.play()
    },
    stop() {
      player.pause();
    },
    next() {
      setState({ ...state, currentIndex: state.currentIndex + 1 });
      const playing = !player.paused
      player.src = `file://${state.playlist[state.currentIndex + 1]?.filePath}`;
      playing && player.play()
    },
    prev() {
      setState({ ...state, currentIndex: state.currentIndex - 1 });
      const playing = !player.paused
      player.src = `file://${state.playlist[state.currentIndex - 1]?.filePath}`;
      playing && player.play()
    },
    push(music) {
      setState({
        ...state,
        currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
        playlist: [...state.playlist, music]
      });
      if (!state.playlist.length) {
        player.src = `file://${music.filePath}`
      }
    },
    remove(music) {
      setState({ ...state, playlist: state.playlist.filter(it => it.filePath === music.filePath) })
    },
  };
}

export const App: React.FC = () => {
  const { loading, error, data } = useQuery<{ musics: Music[] }>(Query);
  const { next, stop, play, prev, push, playlist, current } = usePlayer();
  return (
    <>
    <ul>
      {playlist.map(it => <li style={{ color: it.filePath === current?.filePath ? "red" : "black" }}>{it.name}</li>)}
    </ul>
    <button onClick={prev}>prev</button>
    <button onClick={next}>next</button>
    {current?.name || "-- none --"}
    <button disabled={current == null} onClick={play}>play</button>
    <button onClick={stop}>stop</button>
    <ul>
    {loading
      ? "loading..."
      : data?.musics.map(it => <Music music={it} onClick={() => push(it)}/>)
    }
    </ul>
    </>
  );
}

const Music: React.FC<{ music: Music, onClick(): void }> = ({ music, onClick }) => {
  return (
    <li>
    <button onClick={onClick}>+</button>{music.name}
    </li>
  );
}
