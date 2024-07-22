import { useCallback, useContext } from 'react';

import { deleteSession } from '../../api';
import { SessionsContext } from '../store';

export function useDeleteSession() {
  const { setSessions } = useContext(SessionsContext);

  return useCallback(
    async (id: number | string) => {
      const isDeleted = await deleteSession(id);

      if (isDeleted) {
        setSessions((sessions) => {
          return sessions.filter((session) => String(session.id) !== String(id));
        });
      }
    },
    [setSessions],
  );
}
