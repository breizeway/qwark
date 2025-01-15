import { useEffect, useState } from "react";

const EVENT_NAME = "timerEvent";

export type TimerEventId = "finished";
export interface TimerEventDetails {
  timerId: string;
  eventId: TimerEventId;
}
export type TimerEvent = CustomEvent<TimerEventDetails>;

interface CustomEventMap {
  [EVENT_NAME]: TimerEvent;
}

declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}

export const dispatchTimerEvent = (detail: TimerEventDetails) => {
  const timerEvent = new CustomEvent<TimerEventDetails>(EVENT_NAME, {
    detail,
  });
  document.dispatchEvent(timerEvent);
};

export const useTimerEvents = () => {
  // const [timerFinishedId, setTimerFinishedId] = useState<string>();
  const [events, setEvents] = useState<
    Partial<{ [keys in TimerEventId]: string }>
  >({});

  useEffect(() => {
    const handleTimerEvent = (e: TimerEvent) => {
      const { timerId, eventId } = e.detail;
      setEvents((e) => ({ ...e, ...{ [eventId]: timerId } }));
    };

    document.addEventListener(EVENT_NAME, handleTimerEvent);
    return () => {
      document.removeEventListener(EVENT_NAME, handleTimerEvent);
    };
  }, []);

  return events;
};
