export type SessionType = 'meeting' | 'event';

export type SessionObj = {
  id: number;
  body: string;
  title: string;
  type: SessionType;
  startDateTime: string;
  endDateTime: string;
};

export type CreateSessionInput = Omit<SessionObj, 'id'>;
export type UpdateSessionInput = Partial<Omit<SessionObj, 'id'>>;
