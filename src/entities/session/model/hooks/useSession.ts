import { useContext, useMemo } from 'react';

import { SessionsContext } from '../store';

export function useSession(id: string | number | undefined) {
  const { sessions } = useContext(SessionsContext);

  return useMemo(() => {
    return sessions.find((session) => String(session.id) === String(id));
  }, [id, sessions]);
}
