import { create } from 'zustand';

import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  SessionObj,
  CreateSessionInput,
  UpdateSessionInput,
} from '../../api';

export interface SessionsStore {
  sessions: SessionObj[];
  fetchSessions: () => Promise<SessionObj[] | null>;
  createSession: (input: CreateSessionInput) => Promise<SessionObj | null>;
  updateSession: (input: UpdateSessionInput) => Promise<SessionObj | null>;
  deleteSession: (id: string | number) => Promise<number | null>;
}

export const useSessionsStore = create<SessionsStore>((setState) => {
  return {
    sessions: [],

    /**
     * Fetch sessions from the api
     * Success: override sessions in the store with fetched sessions and return them
     * Failure: return null
     */
    fetchSessions: async () => {
      try {
        const response = await getSessions();
        const sessions: SessionObj[] = await response.json();

        if (Array.isArray(sessions)) {
          setState((state) => ({ ...state, sessions }));
          return sessions;
        }

        return null;
      } catch {
        return null;
      }
    },

    /**
     * Create session
     * Success: add session to the store and return created session
     * Failure: return null
     */
    createSession: async (input) => {
      try {
        const response = await createSession(input);
        const createdSession: SessionObj = await response.json();

        if (createdSession) {
          setState((state) => ({
            ...state,
            sessions: [createdSession, ...state.sessions],
          }));

          return createdSession;
        }

        return null;
      } catch {
        return null;
      }
    },

    /**
     * Update session
     * Success: update session in the store and return updated session
     * Failure: return null
     */
    updateSession: async (input) => {
      try {
        const response = await updateSession(input);
        const updatedSession: SessionObj = await response.json();

        if (updatedSession) {
          setState((state) => ({
            ...state,
            sessions: state.sessions.map((session) => {
              if (String(session.id) === String(input.id)) {
                return { ...session, ...updatedSession };
              }

              return session;
            }),
          }));

          return updatedSession;
        }

        return null;
      } catch {
        return null;
      }
    },

    /**
     * Delete session
     * Success: delete seesion from the store and return deleted session id
     * Failure: return null
     */
    deleteSession: async (id) => {
      try {
        await deleteSession(id);

        setState((state) => ({
          ...state,
          sessions: state.sessions.filter((session) => {
            return String(session.id) !== String(id);
          }),
        }));

        return Number.parseInt(String(id), 10);
      } catch {
        return null;
      }
    },
  };
});
