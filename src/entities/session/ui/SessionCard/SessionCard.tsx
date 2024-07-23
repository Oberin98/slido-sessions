import cn from 'classnames';

import * as styles from './SessionCard.module.css';

interface SessionCardProps {
  id: number | string;
  title: string;
  onView: (id: string) => void;
  className?: string;
}

function SessionCard({ id, title, onView, className }: SessionCardProps) {
  const handleViewClick = () => {
    onView(String(id));
  };

  return (
    <div className={cn(styles.root, className)}>
      <h2>{title}</h2>
      <button onClick={handleViewClick}>View Details</button>
    </div>
  );
}

export default SessionCard;
