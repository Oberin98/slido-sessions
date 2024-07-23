import { SessionsStore } from './store';

export function getSessionsSelector() {
  return (store: SessionsStore) => {
    return store.sessions;
  };
}

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

export function getCreateSessionSelector() {
  return (store: SessionsStore) => {
    return store.createSession;
  };
}

export function getUpdateSessionSelector() {
  return (store: SessionsStore) => {
    return store.updateSession;
  };
}

export function getDeleteSessionSelector() {
  return (store: SessionsStore) => {
    return store.deleteSession;
  };
}
