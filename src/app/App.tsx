import { useEffect, useState, useMemo, useCallback } from 'react';

import { SessionData, SessionType } from '~entities/session';
import CreateSessionPage from '~pages/create-session';
import SessionPage from '~pages/session';
import UpdateSessionPage from '~pages/update-session';

import * as styles from './App.module.css';

export function App() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [editingSession, setEditingSession] = useState<SessionData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<SessionType | ''>('');

  const search = useCallback(
    (session: SessionData) => {
      return (
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [searchTerm],
  );

  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');

  const filteredSessions = useMemo(
    () =>
      sessions.filter((session) => {
        if (typeFilter === '' && !filterFromDate && !filterToDate) {
          return search(session);
        }

        const sessionStart = Number(session.startDateTime);
        const sessionEnd = Number(session.endDateTime);
        const fromTime = filterFromDate ? new Date(filterFromDate).getTime() / 1000 : null;
        const toTime = filterToDate ? new Date(filterToDate).getTime() / 1000 : null;

        return (
          (typeFilter !== '' ? session.type === typeFilter : true) &&
          (fromTime ? sessionStart >= fromTime : true) &&
          (toTime ? sessionEnd <= toTime : true) &&
          search(session)
        );
      }),
    [sessions, typeFilter, filterFromDate, filterToDate, search],
  );

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

  const fetchSessions = async () => {
    const response = await fetch('http://localhost:3000/sessions');
    const sessionData = await response.json();

    setSessions(sessionData);
  };

  const handleSessionSelect = (session: SessionData) => {
    setSelectedSession(session);
  };

  const handleSessionCreate = () => {
    setCreatingNewSession(true);
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
          <button onClick={handleSessionCreate}>Create New Session</button>
          <article>
            <h2>Search sessions</h2>
            <div>
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="session-type-select">Filter by session type:</label>
              <select
                name="session-types"
                id="session-type-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as SessionType)}
              >
                <option value="">No filter</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div>
              <label>From:</label>
              <input type="datetime-local" value={filterFromDate} onChange={(e) => setFilterFromDate(e.target.value)} />
            </div>
            <div>
              <label>To:</label>
              <input type="datetime-local" value={filterToDate} onChange={(e) => setFilterToDate(e.target.value)} />
            </div>
          </article>
        </>
      )}
      {creatingNewSession ? (
        <>
          <CreateSessionPage onCreate={handleSessionCreated} onCancel={() => setCreatingNewSession(false)} />
        </>
      ) : editingSession ? (
        <>
          <UpdateSessionPage
            session={editingSession}
            onUpdate={handleSessionUpdated}
            onCancel={() => setEditingSession(null)}
          />
        </>
      ) : selectedSession ? (
        <SessionPage
          session={selectedSession}
          onEdit={handleSessionEdit}
          onDelete={handleSessionDeleted}
          onCancel={() => setSelectedSession(null)}
        />
      ) : sessions.length > 0 ? (
        <section>
          <h1>Sessions ({filteredSessions.length})</h1>
          {filteredSessions.map((session) => (
            <article key={session.id}>
              <h2>{session.title}</h2>
              <button onClick={() => handleSessionSelect(session)}>View Details</button>
            </article>
          ))}
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
