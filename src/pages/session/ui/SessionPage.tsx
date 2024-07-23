import { useNavigate, useParams } from 'react-router-dom';

import { useSessionsStore, getSessionByIdSelector, getDeleteSessionSelector, SessionCard } from '~entities/session';

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

  return (
    <>
      {session && (
        <SessionCard
          title={session.title}
          body={session.body}
          type={session.type}
          startDateTime={session.startDateTime}
          endDateTime={session.endDateTime}
          footer={
            <div>
              <button onClick={handleDeleteSession}>Delete</button>
              <button onClick={handleSessionEdit}>Edit</button>
              <button onClick={handleBackClick}>Back to List</button>
            </div>
          }
        />
      )}

      {!session && <p>Not found</p>}
    </>
  );
}

export default SessionPage;
