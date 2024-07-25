import { create } from 'zustand';

import { SessionDTO, CreateSessionInputDTO, UpdateSessionInputDTO } from './types';
import { formatCreateInputForAPI, formatSessionForStore, formatUpdateInputForAPI } from './utils';
import { getSessions, createSession, updateSession, deleteSession, SessionObj } from '../../api';

export interface SessionsStore {
  sessions: SessionDTO[];
  fetchSessions: () => Promise<SessionDTO[] | null>;
  createSession: (input: CreateSessionInputDTO) => Promise<SessionDTO | null>;
  updateSession: (input: UpdateSessionInputDTO) => Promise<SessionDTO | null>;
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
        const rawSessions: SessionObj[] = await response.json();

        if (Array.isArray(rawSessions)) {
          const sessions = rawSessions.map(formatSessionForStore);
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
        const requestInput = formatCreateInputForAPI(input);
        const response = await createSession(requestInput);
        const rawSession: SessionObj = await response.json();

        if (rawSession) {
          const createdSession = formatSessionForStore(rawSession);

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
        const requestInput = formatUpdateInputForAPI(input);
        const response = await updateSession(requestInput);
        const rawSession: SessionObj = await response.json();

        if (rawSession) {
          const updatedSession = formatSessionForStore(rawSession);

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
