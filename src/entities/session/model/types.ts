export type SessionType = 'meeting' | 'event';

export type SessionRemoteData = {
  id: number;
  body: string;
  title: string;
};

export type SessionData = SessionRemoteData & {
  type: SessionType;
  startDateTime: string;
  endDateTime: string;
};
