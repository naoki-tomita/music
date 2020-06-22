import { useState } from "react";

export interface Music {
  id: string;
  name: string;
  filePath: string;
}

interface PlayerState {
  current: Music | null;
  playlist: Music[];
  player: HTMLAudioElement;
  playing: boolean;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PlayerAction {
  play(): void;
  stop(): void;
  pause(): void;
  next(): void;
  prev(): void;
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

export function usePlayer(): PlayerStore {
  const [state, setState] = useState<PlayerInnerState>({
    currentIndex: -1,
    playlist: [],
    playing: false,
  });
  return {
    current: state.playlist[state.currentIndex] || null,
    player,
    playlist: state.playlist,
    playing: state.playing,
    hasNext: (state.playlist.length - 1) > state.currentIndex,
    hasPrev: state.currentIndex > 0,
    play() {
      player.play();
      setState({ ...state, playing: true });
    },
    pause() {
      player.pause();
      setState({ ...state, playing: false });
    },
    stop() {
      player.pause();
      player.currentTime = 0;
      setState({ ...state, playing: false });
    },
    next() {
      setState({ ...state, currentIndex: state.currentIndex + 1 });
      player.src = `file://${state.playlist[state.currentIndex + 1]?.filePath}`;
      state.playing && player.play()
    },
    prev() {
      setState({ ...state, currentIndex: state.currentIndex - 1 });
      player.src = `file://${state.playlist[state.currentIndex - 1]?.filePath}`;
      state.playing && player.play();
    },
    push(music) {
      const playing = state.playlist.length === 0 || state.playing;
      const firstPlay = state.playlist.length === 0;
      setState({
        ...state,
        currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
        playlist: [...state.playlist, music],
        playing,
      });
      if (firstPlay) {
        player.src = `file://${music.filePath}`
        player.play();
      }
    },
    remove(music) {
      setState({ ...state, playlist: state.playlist.filter(it => it.filePath === music.filePath) })
    },
  };
}
