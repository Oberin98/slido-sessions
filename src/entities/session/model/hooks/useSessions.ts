import { useContext } from 'react';

import { SessionsContext } from '../store';

export function useSessions() {
  const { sessions } = useContext(SessionsContext);
  return sessions;
}
