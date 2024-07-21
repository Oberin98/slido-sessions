import React, { useState } from 'react';

import { SessionData, SessionType } from '~entities/session';

interface UpdateSessionPageProps {
  session: SessionData;
  onUpdate: (session: SessionData) => void;
  onCancel: () => void;
}

function UpdateSessionPage({ session, onUpdate, onCancel }: UpdateSessionPageProps) {
  const [title, setTitle] = useState(session.title);
  const [body, setBody] = useState(session.body);
  const [startDateTime, setStartDateTime] = useState(session.startDateTime);
  const [endDateTime, setEndDateTime] = useState(session.endDateTime);
  const [sessionType, setSessionType] = useState<SessionType>(session.type);

  const dateToUnix = (date: string) => {
    return (new Date(date).getTime() / 1000).toString();
  };

  const unixToStringDate = (unix: string) => {
    const date = new Date(Number(unix) * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
  };

  const handleSaveEditedPost = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
    body: Partial<SessionData>,
  ) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const updated: SessionData = await response.json();

    onUpdate(updated);
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
    <form
      onSubmit={(event) =>
        handleSaveEditedPost(event, session.id, {
          title,
          body,
          startDateTime,
          endDateTime,
          type: sessionType,
        })
      }
    >
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
            value={unixToStringDate(startDateTime)}
            onChange={(e) => setStartDateTime(dateToUnix(e.target.value))}
          />
        </dd>

        <dt>
          <label htmlFor="end-date">End Date:</label>
        </dt>
        <dd>
          <input
            id="end-date"
            type="datetime-local"
            value={unixToStringDate(endDateTime)}
            onChange={(e) => setEndDateTime(dateToUnix(e.target.value))}
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

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default UpdateSessionPage;
