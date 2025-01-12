import type { Duration } from "date-fns";

export type TimerDuration = Pick<Duration, "hours" | "minutes" | "seconds">;

export type TimerEventAction = "start" | "stop";
export interface TimerEvent {
  action: TimerEventAction;
  time: number;
}

export interface Timer {
  id: string;
  instance: string;
  duration: TimerDuration;
  events: TimerEvent[];
  name?: string;
}
