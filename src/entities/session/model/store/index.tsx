import React, { createContext, useEffect, useMemo, useState } from 'react';

import { getSessions, SessionObj } from '../../api';

type SessionsStoreState = {
  sessions: SessionObj[];
  setSessions: React.Dispatch<React.SetStateAction<SessionObj[]>>;
};

export const SessionsContext = createContext<SessionsStoreState>({
  sessions: [],
  setSessions: () => null,
});

export function SessionsStore({ children }: React.PropsWithChildren) {
  const [sessions, setSessions] = useState<SessionObj[]>([]);

  // TODO - move into api folder
  const fetchSessions = async () => {
    const sessions = await getSessions();

    if (Array.isArray(sessions)) {
      setSessions(sessions);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const value = useMemo<SessionsStoreState>(() => {
    return { sessions, setSessions };
  }, [sessions]);

  return <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>;
}
