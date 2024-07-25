export type SessionType = 'meeting' | 'event';

// TODO - fix api to store startDateTime and endDateTime as timestamp in ms

/**
 * Session coming from a request.
 * @property {number} startDateTime - Start date and time of the session (timestamp in seconds).
 * @property {number} endDateTime - End date and time of the session (timestamp in seconds).
 */
export type SessionObj = {
  id: number;
  body: string;
  title: string;
  type: SessionType;
  startDateTime: number;
  endDateTime: number;
};

/**
 * Request body to create session
 * @property {number} startDateTime - Start date and time of the session (timestamp in seconds).
 * @property {number} endDateTime - End date and time of the session (timestamp in seconds).
 */
export type CreateSessionBody = {
  body: string;
  title: string;
  type: SessionType;
  startDateTime: number;
  endDateTime: number;
};

/**
 * Request body to update session
 * @property {number} startDateTime - Start date and time of the session (timestamp in seconds).
 * @property {number} endDateTime - End date and time of the session (timestamp in seconds).
 */
export type UpdateSessionBody = {
  id: string | number;
  body?: string;
  title?: string;
  type?: SessionType;
  startDateTime?: number;
  endDateTime?: number;
};
