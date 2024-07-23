import { SessionsStore } from './store';

/**
 * Get sessions from the store
 */
export function getSessionsSelector() {
  return (store: SessionsStore) => {
    return store.sessions;
  };
}

/**
 * Get specific seesion from the store by id
 */
export function getSessionByIdSelector(id: string | number | undefined) {
  return (store: SessionsStore) => {
    if (!id) {
      return null;
    }

    const session = store.sessions.find((session) => {
      return String(session.id) === String(id);
    });

    return session || null;
  };
}

/**
 * Get create session callback from the store
 */
export function getCreateSessionSelector() {
  return (store: SessionsStore) => {
    return store.createSession;
  };
}

/**
 * Get update session callback from the store
 */
export function getUpdateSessionSelector() {
  return (store: SessionsStore) => {
    return store.updateSession;
  };
}

/**
 * Get delete session callback from the store
 */
export function getDeleteSessionSelector() {
  return (store: SessionsStore) => {
    return store.deleteSession;
  };
}
