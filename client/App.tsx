import { useEffect, FormEvent, useState, useMemo, useCallback } from 'react';

import * as styles from './App.module.css';

type SessionType = 'meeting' | 'event';

type SessionRemoteData = {
  id: number;
  body: string;
  title: string;
};

type SessionData = SessionRemoteData & {
  type: SessionType;
  startDateTime: string;
  endDateTime: string;
};

export function App() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionData | undefined>(undefined);
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [editingSession, setEditingSession] = useState<SessionData | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [sessionType, setSessionType] = useState<SessionType>('meeting');
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

  const fetchSessions = async () => {
    const response = await fetch('http://localhost:3000/sessions');
    const sessionData = await response.json();

    setSessions(sessionData);
  };

  const handleSessionSelect = (session: SessionData) => {
    setSelectedSession(session);
  };

  const handleSessionBack = () => {
    setSelectedSession(undefined);
  };

  const handleSessionCreate = () => {
    setCreatingNewSession(true);
    setTitle('');
    setBody('');
    setSessionType('meeting');
  };

  const handleSessionEdit = (session: SessionData) => {
    setEditingSession(session);
    setTitle(session.title);
    setBody(session.body);
    setSessionType(session.type);
    setStartDateTime(session.startDateTime);
    setEndDateTime(session.endDateTime);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

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

  const handleSaveNewSession = async () => {
    const newSession = {
      title,
      body,
      type: sessionType,
      startDateTime,
      endDateTime,
    };

    const response = await fetch('http://localhost:3000/sessions', {
      method: 'POST',
      body: JSON.stringify(newSession),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const session = await response.json();
    setSessions([session, ...sessions]);
    setCreatingNewSession(false);
  };

  const handleDeleteSession = async (id: number) => {
    await fetch(`http://localhost:3000/sessions/${id}`, {
      method: 'DELETE',
    });

    setSessions(sessions.filter((session) => session.id !== id));
    handleSessionBack();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveNewSession();
  };

  const handleSaveEditedPost = async (event: FormEvent<HTMLFormElement>, id: number, body: Partial<SessionData>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const session = await response.json();
    const updated = { ...selectedSession, ...session };

    setSessions(sessions.map((p) => (p.id === id ? updated : p)));
    handleSessionSelect(updated);
    setEditingSession(undefined);
  };

  const dateToUnix = (date: string) => {
    return (new Date(date).getTime() / 1000).toString();
  };

  const unixToDateHuman = (unix: string) => {
    const date = new Date(Number(unix) * 1000);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
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
                required
                onChange={(e) => setEndDateTime(dateToUnix(e.target.value))}
              />
            </dd>
          </dl>

          <button type="submit" onClick={() => validateSessionDuration()}>
            Create Session
          </button>
          <button type="button" onClick={() => setCreatingNewSession(false)}>
            Cancel
          </button>
        </form>
      ) : editingSession ? (
        <form
          onSubmit={(event) =>
            handleSaveEditedPost(event, editingSession.id, {
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
          <button type="button" onClick={() => setEditingSession(undefined)}>
            Cancel
          </button>
        </form>
      ) : selectedSession ? (
        <article>
          <h2>{selectedSession.title}</h2>
          <p>{selectedSession.body}</p>
          <p>{selectedSession.type}</p>
          <p>
            {unixToDateHuman(selectedSession.startDateTime)} - {unixToDateHuman(selectedSession.endDateTime)}
          </p>
          <button onClick={() => handleDeleteSession(selectedSession.id)}>Delete</button>
          <button onClick={() => handleSessionEdit(selectedSession)}>Edit</button>
          <button onClick={handleSessionBack}>Back to List</button>
        </article>
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
