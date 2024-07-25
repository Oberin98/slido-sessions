import cn from 'classnames';
import React, { useMemo } from 'react';

import { SessionType } from '~entities/session/api';
import { dateToDateHuman } from '~shared/lib';

import * as styles from './SessionCard.module.css';

interface SessionCardProps {
  title: string;
  body: string;
  type: SessionType;
  startDateTime: Date;
  endDateTime: Date;
  footer?: React.ReactNode;
  className?: string;
}

// Merge with PreviewSessionCard (???)
function SessionCard({ title, body, type, startDateTime, endDateTime, footer, className }: SessionCardProps) {
  const displayDateRange = useMemo(() => {
    return [dateToDateHuman(startDateTime), dateToDateHuman(endDateTime)].filter(Boolean).join(' - ');
  }, [endDateTime, startDateTime]);

  return (
    <article className={cn(styles.root, className)}>
      <h2>{title}</h2>
      <p>{body}</p>
      <p>{type}</p>
      <p>{displayDateRange}</p>

      {footer}
    </article>
  );
}

export default SessionCard;
