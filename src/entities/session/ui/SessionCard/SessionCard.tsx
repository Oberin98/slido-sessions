import cn from 'classnames';
import React, { useMemo } from 'react';

import { SessionType } from '~entities/session/api';
import { unixToDateHuman } from '~shared/lib';

import * as styles from './SessionCard.module.css';

interface SessionCardProps {
  title: string;
  body: string;
  type: SessionType;
  startDateTime: string;
  endDateTime: string;
  footer?: React.ReactNode;
  className?: string;
}

// Merge with PreviewSessionCard (???)
function SessionCard({ title, body, type, startDateTime, endDateTime, footer, className }: SessionCardProps) {
  const date = useMemo(() => {
    return [startDateTime, endDateTime].filter(Boolean).map(unixToDateHuman).join(' - ');
  }, [endDateTime, startDateTime]);

  return (
    <article className={cn(styles.root, className)}>
      <h2>{title}</h2>
      <p>{body}</p>
      <p>{type}</p>
      <p>{date}</p>

      {footer}
    </article>
  );
}

export default SessionCard;
