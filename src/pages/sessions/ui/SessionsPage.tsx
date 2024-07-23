import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SessionCard, useSessionsStore, getSessionsSelector } from '~entities/session';
import { SessionsFilter, useFilterSessions, FilterSessionsValue } from '~features/filter-sessions';

function SessionsPage() {
  const navigate = useNavigate();

  const handleOnCreateClick = () => {
    navigate('/session/create');
  };

  const handleOnSelectClick = (id: string) => {
    navigate(`/session/${id}`);
  };

  const [filter, setFilter] = useState<FilterSessionsValue>({
    query: '',
    sessionType: '',
    startDateGte: '',
    endDateLte: '',
  });

  const sessions = useSessionsStore(getSessionsSelector());
  const filteredSessions = useFilterSessions({ sessions, filter });

  const isDisplaySessions = filteredSessions.length > 0;

  return (
    <>
      <button onClick={handleOnCreateClick}>Create New Session</button>

      <SessionsFilter value={filter} onChange={setFilter} />

      {isDisplaySessions && (
        <section>
          <h1>Sessions ({filteredSessions.length})</h1>

          {filteredSessions.map((session) => (
            <SessionCard key={session.id} id={session.id} title={session.title} onView={handleOnSelectClick} />
          ))}
        </section>
      )}

      {!isDisplaySessions && <p>No data</p>}
    </>
  );
}

export default SessionsPage;
