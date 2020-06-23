import * as React from "react";
const { useState, useEffect, createContext, useContext } = React;

export interface Music {
  id: string;
  name: string;
  filePath: string;
}

interface PlayerState {
  current: Music | null;
  playlist: Music[];
  playedSongs: Music[];
  afterSongs: Music[];
  player: HTMLAudioElement;
  playing: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  duration: number;
  currentTime: number;
}

interface PlayerAction {
  play(): void;
  stop(): void;
  pause(): void;
  next(): void;
  prev(): void;
  jump(index: number): void;
  push(music: Music): void;
  remove(music: Music): void;
}

interface PlayerInnerState {
  currentIndex: number;
  playlist: Music[];
  playing: boolean;
}

export type PlayerStore = PlayerAction & PlayerState

const player = document.createElement("audio");
player.volume = 0.01;
document.body.append(player);

function _usePlayer(): PlayerStore {
  const [state, setState] = useState<PlayerInnerState>({
    currentIndex: -1,
    playlist: [],
    playing: false,
  });
  useEffect(() => {
    player.onended = () => setState({
      ...state,
      currentIndex: state.currentIndex + 1,
    });
    player.ontimeupdate = () => (console.log(player.currentTime), setState({ ...state }));
  });
  useEffect(() => {
    player.src = `file://${state.playlist[state.currentIndex]?.filePath}`;
    state.playing && player.play();
  }, [state.currentIndex]);
  useEffect(() => {
    state.playing ? player.play() : player.pause();
  }, [state.playing]);
  function play() {
    setState({ ...state, playing: true });
  }
  function pause() {
    setState({ ...state, playing: false });
  }
  function stop() {}
  function next() {
    setState({ ...state, currentIndex: state.currentIndex + 1 });
  }
  function prev() {
    setState({ ...state, currentIndex: state.currentIndex - 1 });
  }
  function jump(index: number) {
    setState({ ...state, currentIndex: index });
  }
  function push(music: Music) {
    const playing = state.playlist.length === 0 || state.playing;
    setState({
      ...state,
      currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
      playlist: [...state.playlist, music],
      playing,
    });
  }
  function remove(music: Music) {
    setState({ ...state, playlist: state.playlist.filter(it => it.filePath === music.filePath) })
  }
  return {
    current: state.playlist[state.currentIndex] || null,
    player,
    playlist: state.playlist,
    playedSongs: state.playlist.slice(0, state.currentIndex),
    afterSongs: state.playlist.slice(state.currentIndex + 1),
    playing: state.playing,
    hasNext: (state.playlist.length - 1) > state.currentIndex,
    hasPrev: state.currentIndex > 0,
    duration: player.duration,
    currentTime: player.currentTime,
    play,
    pause,
    stop,
    next,
    prev,
    jump,
    push,
    remove,
  };
}

const Context = createContext<PlayerStore>({} as any);
export const PlayerProvider: React.FC = ({ children }) => {
  return (
    <Context.Provider value={_usePlayer()}>{children}</Context.Provider>
  );
};
export function usePlayer() {
  return useContext(Context);
}
