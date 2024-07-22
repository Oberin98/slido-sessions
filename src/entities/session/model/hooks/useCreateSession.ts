import { useCallback, useContext } from 'react';

import { createSession, CreateSessionInput } from '../../api';
import { SessionsContext } from '../store';

export function useCreateSession() {
  const { setSessions } = useContext(SessionsContext);

  return useCallback(
    async (data: CreateSessionInput) => {
      const createdSession = await createSession(data);

      if (createdSession) {
        setSessions((sessions) => [createdSession, ...sessions]);
        return createdSession;
      }

      return null;
    },
    [setSessions],
  );
}
