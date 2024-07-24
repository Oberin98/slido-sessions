import { SessionType } from '~entities/session';

export type CreateSessionFormState = {
  title: string;
  body: string;
  sessionType: SessionType;
  startDateTime: string;
  endDateTime: string;
};
