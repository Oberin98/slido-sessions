import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SessionObj, SessionType, useSessionsStore, getSessionsSelector } from '~entities/session';

function SessionsPage() {
  const navigate = useNavigate();

  const sessions = useSessionsStore(getSessionsSelector());

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<SessionType | ''>('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');

  const search = useCallback(
    (session: SessionObj) => {
      return (
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [searchTerm],
  );

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
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
    });
  }, [sessions, typeFilter, filterFromDate, filterToDate, search]);

  const handleOnCreateClick = () => {
    navigate('/session/create');
  };

  const handleOnSelectClick = (id: number) => {
    navigate(`/session/${id}`);
  };

  return (
    <>
      <button onClick={handleOnCreateClick}>Create New Session</button>

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

      {sessions.length > 0 ? (
        <section>
          <h1>Sessions ({filteredSessions.length})</h1>
          {filteredSessions.map((session) => (
            <article key={session.id}>
              <h2>{session.title}</h2>
              <button onClick={() => handleOnSelectClick(session.id)}>View Details</button>
            </article>
          ))}
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default SessionsPage;
