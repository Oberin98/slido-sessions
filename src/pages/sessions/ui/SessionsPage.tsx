import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSessionsStore, getSessionsSelector } from '~entities/session';
import { SessionsFilter, useFilterSessions, FilterSessionsValue } from '~features/filter-sessions';
import Button from '~shared/ui/Button';
import { SessionsList } from '~widgets/sessions-list';

function SessionsPage() {
  const navigate = useNavigate();

  const handleOnCreateClick = () => {
    navigate('/session/create');
  };

  const [filter, setFilter] = useState<FilterSessionsValue>({
    query: '',
    sessionType: '',
    startDateGte: undefined,
    endDateLte: undefined,
  });

  const sessions = useSessionsStore(getSessionsSelector());
  const filteredSessions = useFilterSessions({ sessions, filter });

  return (
    <>
      <Button onClick={handleOnCreateClick}>Create New Session</Button>
      <SessionsFilter value={filter} onChange={setFilter} />
      <SessionsList sessions={filteredSessions} />
    </>
  );
}

export default SessionsPage;
