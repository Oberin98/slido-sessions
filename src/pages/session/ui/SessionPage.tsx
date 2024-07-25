import { useNavigate, useParams } from 'react-router-dom';

import { useSessionsStore, getSessionByIdSelector, getDeleteSessionSelector, SessionCard } from '~entities/session';
import Button from '~shared/ui/Button';

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
              <Button onClick={handleDeleteSession}>Delete</Button>
              <Button onClick={handleSessionEdit}>Edit</Button>
              <Button onClick={handleBackClick}>Back to List</Button>
            </div>
          }
        />
      )}

      {!session && <p>Not found</p>}
    </>
  );
}

export default SessionPage;
