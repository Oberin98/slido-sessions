import { useNavigate, useParams } from 'react-router-dom';

import { useSessionsStore, getSessionByIdSelector } from '~entities/session';
import { UpdateSessionForm } from '~features/update-session';

function UpdateSessionPage() {
  const navigate = useNavigate();

  const { sessionId } = useParams();
  const session = useSessionsStore(getSessionByIdSelector(sessionId));

  const handleNavigateToSessionPage = () => {
    if (sessionId) {
      navigate(`/session/${sessionId}`, { replace: true });
    }
  };

  return (
    <>
      {session && (
        <UpdateSessionForm
          session={session}
          onUpdate={handleNavigateToSessionPage}
          onCancel={handleNavigateToSessionPage}
        />
      )}

      {!session && <p>Not found</p>}
    </>
  );
}

export default UpdateSessionPage;
