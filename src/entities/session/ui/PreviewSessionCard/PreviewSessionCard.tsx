import cn from 'classnames';

import * as styles from './PreviewSessionCard.module.css';

interface PreviewSessionCardProps {
  id: number | string;
  title: string;
  onView: (id: string) => void;
  className?: string;
}

function PreviewSessionCard({ id, title, onView, className }: PreviewSessionCardProps) {
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

export default PreviewSessionCard;
