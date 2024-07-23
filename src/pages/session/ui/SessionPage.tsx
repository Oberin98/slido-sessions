import { useNavigate, useParams } from 'react-router-dom';

import { useSessionsStore, getSessionByIdSelector, getDeleteSessionSelector } from '~entities/session';

function SessionPage() {
  const navigate = useNavigate();

  const { sessionId } = useParams();

  const session = useSessionsStore(getSessionByIdSelector(sessionId));
  const deleteSession = useSessionsStore(getDeleteSessionSelector());

  const handleSessionEdit = () => {
    if (sessionId) {
      navigate(`/session/${sessionId}/update`);
    }
  };

  const handleDeleteSession = async () => {
    if (sessionId) {
      deleteSession(sessionId);
      navigate('/', { replace: true });
    }
  };

  const handleBackClick = () => {
    navigate('/', { replace: true });
  };

  const unixToDateHuman = (unix: string) => {
    const date = new Date(Number(unix) * 1000);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <>
      {session && (
        <article>
          <h2>{session.title}</h2>
          <p>{session.body}</p>
          <p>{session.type}</p>
          <p>
            {unixToDateHuman(session.startDateTime)} - {unixToDateHuman(session.endDateTime)}
          </p>
          <button onClick={handleDeleteSession}>Delete</button>
          <button onClick={handleSessionEdit}>Edit</button>
          <button onClick={handleBackClick}>Back to List</button>
        </article>
      )}

      {!session && <p>Not found</p>}
    </>
  );
}

export default SessionPage;
