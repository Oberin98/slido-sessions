import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SessionType, useSessionsStore, getCreateSessionSelector } from '~entities/session';

function CreateSessionPage() {
  const navigate = useNavigate();

  const createSession = useSessionsStore(getCreateSessionSelector());

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sessionType, setSessionType] = useState<SessionType>('meeting');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const session = await createSession({
      title,
      body,
      type: sessionType,
      startDateTime,
      endDateTime,
    });

    if (session) {
      navigate(`/session/${session.id}`);
    }
  };

  const handleOnCancelClick = () => {
    navigate('/');
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

  return (
    <form onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor="title">Title:</label>
        </dt>
        <dd>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
                checked={sessionType === 'event'}
                onChange={() => setSessionType('event')}
              />
              <label htmlFor="event">Event</label>
            </div>
          </fieldset>
        </div>

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
            required
            onChange={(e) => setStartDateTime(new Date(e.target.value).toISOString())}
          />
        </dd>

        <dt>
          <label htmlFor="end-date">End Date:</label>
        </dt>
        <dd>
          <input
            id="end-date"
            type="datetime-local"
            required
            onChange={(e) => setEndDateTime(new Date(e.target.value).toISOString())}
          />
        </dd>
      </dl>

      <button type="submit" onClick={() => validateSessionDuration()}>
        Create Session
      </button>

      <button type="button" onClick={handleOnCancelClick}>
        Cancel
      </button>
    </form>
  );
}

export default CreateSessionPage;
