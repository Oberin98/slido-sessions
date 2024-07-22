import { useEffect, useState } from 'react';

import { SessionData } from '~entities/session';
import CreateSessionPage from '~pages/create-session';
import SessionPage from '~pages/session';
import SessionsPage from '~pages/sessions';
import UpdateSessionPage from '~pages/update-session';

import * as styles from './App.module.css';

export function App() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [editingSession, setEditingSession] = useState<SessionData | null>(null);

  const handleSessionCreated = (session: SessionData) => {
    setSessions([session, ...sessions]);
    setCreatingNewSession(false);
  };

  const handleSessionUpdated = (session: SessionData) => {
    setSessions(sessions.map((p) => (p.id === session.id ? session : p)));
    handleSessionSelect(session);
    setEditingSession(null);
  };

  const handleSessionDeleted = (session: SessionData) => {
    setSessions(sessions.filter(({ id }) => session.id !== id));
    setSelectedSession(null);
  };

  const handleSessionEdit = (session: SessionData) => {
    setEditingSession(session);
    setSelectedSession(null);
  };

  const handleSessionSelect = (session: SessionData) => {
    setSelectedSession(session);
  };

  const handleCreateSession = () => {
    setCreatingNewSession(true);
  };

  const handleSelectSession = (session: SessionData) => {
    setSelectedSession(session);
  };

  const fetchSessions = async () => {
    const response = await fetch('http://localhost:3000/sessions');
    const sessionData = await response.json();

    setSessions(sessionData);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <h1>Slido Sessions Example App</h1>
      </header>

      {!creatingNewSession && !editingSession && !selectedSession && (
        <>
          <SessionsPage
            sessions={sessions}
            onCreateSession={handleCreateSession}
            onSelectSession={handleSelectSession}
          />
        </>
      )}

      {creatingNewSession && (
        <>
          <CreateSessionPage onCreate={handleSessionCreated} onCancel={() => setCreatingNewSession(false)} />
        </>
      )}

      {editingSession && (
        <>
          <UpdateSessionPage
            session={editingSession}
            onUpdate={handleSessionUpdated}
            onCancel={() => setEditingSession(null)}
          />
        </>
      )}

      {selectedSession && (
        <>
          <SessionPage
            session={selectedSession}
            onEdit={handleSessionEdit}
            onDelete={handleSessionDeleted}
            onCancel={() => setSelectedSession(null)}
          />
        </>
      )}
    </div>
  );
}
