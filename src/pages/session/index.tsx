import { SessionData } from '~entities/session';

interface SessionPageProps {
  session: SessionData;
  onEdit: (session: SessionData) => void;
  onDelete: (session: SessionData) => void;
  onCancel: () => void;
}

function SessionPage({ session, onEdit, onDelete, onCancel }: SessionPageProps) {
  const handleSessionEdit = () => {
    onEdit(session);
  };

  const handleDeleteSession = async () => {
    await fetch(`http://localhost:3000/sessions/${session.id}`, {
      method: 'DELETE',
    });

    onDelete(session);
  };

  const unixToDateHuman = (unix: string) => {
    const date = new Date(Number(unix) * 1000);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <article>
      <h2>{session.title}</h2>
      <p>{session.body}</p>
      <p>{session.type}</p>
      <p>
        {unixToDateHuman(session.startDateTime)} - {unixToDateHuman(session.endDateTime)}
      </p>
      <button onClick={handleDeleteSession}>Delete</button>
      <button onClick={handleSessionEdit}>Edit</button>
      <button onClick={onCancel}>Back to List</button>
    </article>
  );
}

export default SessionPage;
