import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SessionType, useSessionsStore, getSessionByIdSelector, getUpdateSessionSelector } from '~entities/session';

function UpdateSessionPage() {
  const navigate = useNavigate();

  const { sessionId } = useParams();
  const session = useSessionsStore(getSessionByIdSelector(sessionId));
  const updateSession = useSessionsStore(getUpdateSessionSelector());

  const [title, setTitle] = useState(session?.title || '');
  const [body, setBody] = useState(session?.body || '');
  const [sessionType, setSessionType] = useState<SessionType>(session?.type || 'event');
  const [startDateTime, setStartDateTime] = useState(() => {
    return session?.startDateTime.toString() || '';
  });
  const [endDateTime, setEndDateTime] = useState(() => {
    return session?.endDateTime.toString() || '';
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sessionId) {
      const updatedSession = await updateSession({
        id: sessionId,
        title,
        body,
        // TODO - add form validation to prevent case when startDateTime or endDateTime is absent
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        type: sessionType,
      });

      if (updatedSession) {
        navigate(`/session/${sessionId}`, { replace: true });
      }
    }
  };

  const validateSessionDuration = (): void => {
    // Meeting can last up to 1 day
    // Event can be set up for more days
    const endDateInput = document.getElementById('end-date') as HTMLObjectElement;
    const startTime = Number(startDateTime);
    const endTime = Number(endDateTime);
    const duration = endTime - startTime;
    const oneDayInSec = 24 * 60 * 60;

    if (sessionType === 'meeting' && duration > oneDayInSec) {
      endDateInput.setCustomValidity('Meeting cannot be longer than 24 hours.');
    } else {
      endDateInput.setCustomValidity('');
    }
  };

  const handleBackClick = () => {
    if (sessionId) {
      navigate(`/session/${sessionId}`, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor="title">Title:</label>
        </dt>
        <dd>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </dd>

        <dt>
          <label htmlFor="body">Body:</label>
        </dt>
        <dd>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
        </dd>

        <dt>
          <label htmlFor="start-date">Start Date:</label>
        </dt>
        <dd>
          <input
            id="start-date"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </dd>

        <dt>
          <label htmlFor="end-date">End Date:</label>
        </dt>
        <dd>
          <input
            id="end-date"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </dd>

        <div>
          <fieldset>
            <legend>Session type</legend>
            <div>
              <input
                type="radio"
                name="meeting"
                id="meeting"
                value="meeting"
                checked={sessionType === 'meeting'}
                onChange={() => setSessionType('meeting')}
              />
              <label htmlFor="meeting">Meeting</label>
            </div>
            <div>
              <input
                type="radio"
                value="event"
                name="event"
                id="event"
                checked={sessionType === 'event'}
                onChange={() => setSessionType('event')}
              />
              <label htmlFor="event">Event</label>
            </div>
          </fieldset>
        </div>
      </dl>

      <button type="submit" onClick={() => validateSessionDuration()}>
        Save Changes
      </button>

      <button type="button" onClick={handleBackClick}>
        Cancel
      </button>
    </form>
  );
}

export default UpdateSessionPage;
