export function classNames(params: { [className: string]: boolean }) {
  return Object.entries(params).filter(([, value]) => value).map(([key]) => key).join(" ");
}

function fillZero(number: number, digitCount: number): string {
  return `0000${number}`.substr(-digitCount);
}

export function secondToMinuteString(time: number): string {
  time = Math.round(time);
  const minutes = Math.floor(time / 60);
  const seconds = minutes === 0 ? time : time - (minutes * 60);
  return `${minutes}:${fillZero(seconds, 2)}`;
}
