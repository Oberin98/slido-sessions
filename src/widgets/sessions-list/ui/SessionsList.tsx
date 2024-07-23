import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { SessionCard, SessionObj } from '~entities/session';

import * as styles from './SessionsList.module.css';

interface SessionsListProps {
  sessions: SessionObj[];
  loading?: boolean;
  className?: string;
}

function SessionsList({ sessions, loading, className }: SessionsListProps) {
  const navigate = useNavigate();

  const handleOnSelectClick = (id: string) => {
    navigate(`/session/${id}`);
  };

  const isDisplaySessions = sessions.length > 0;
  const isDisplayNoDataPlaceholder = !isDisplaySessions && !loading;
  const isDisplayLoaderPlaceholder = !isDisplaySessions && loading;

  return (
    <div className={cn(styles.root, className)}>
      {isDisplaySessions && (
        <section>
          <h2>Sessions ({sessions.length})</h2>

          {sessions.map((session) => (
            <SessionCard key={session.id} id={session.id} title={session.title} onView={handleOnSelectClick} />
          ))}
        </section>
      )}

      {isDisplayNoDataPlaceholder && <p className={styles.noDataPlaceholder}>No data</p>}
      {isDisplayLoaderPlaceholder && <p className={styles.loaderPlaceholder}>Loading...</p>}
    </div>
  );
}

export default SessionsList;