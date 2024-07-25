import { SessionType } from '../../api';

export type SessionDTO = {
  id: number;
  body: string;
  title: string;
  type: SessionType;
  startDateTime: Date;
  endDateTime: Date;
};

export type CreateSessionInputDTO = {
  body: string;
  title: string;
  type: SessionType;
  startDateTime: Date;
  endDateTime: Date;
};

export type UpdateSessionInputDTO = {
  id: number | string;
  body?: string;
  title?: string;
  type?: SessionType;
  startDateTime?: Date;
  endDateTime?: Date;
};
