import { useCallback, useContext } from 'react';

import { updateSession, UpdateSessionInput } from '../../api';
import { SessionsContext } from '../store';

export function useUpdateSession() {
  const { setSessions } = useContext(SessionsContext);

  return useCallback(
    async (id: string | number, data: UpdateSessionInput) => {
      const updatedSession = await updateSession(id, data);

      if (updatedSession) {
        setSessions((sessions) => {
          return sessions.map((session) => {
            return String(session.id) === String(id) ? { ...session, ...updatedSession } : session;
          });
        });

        return updatedSession;
      }

      return null;
    },
    [setSessions],
  );
}
