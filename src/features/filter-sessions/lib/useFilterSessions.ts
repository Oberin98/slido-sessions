import { useMemo } from 'react';

import { SessionObj } from '~entities/session';

import { FilterSessionsValue } from './types';

type UseFilterSessionsOptions = {
  sessions: SessionObj[];
  filter: FilterSessionsValue;
};

/**
 * Utility hook to filter list of sessions
 */
export function useFilterSessions({ sessions, filter }: UseFilterSessionsOptions) {
  return useMemo(() => {
    const filterCallbacks: ((session: SessionObj) => boolean)[] = [];

    // Filter by title
    if (filter?.query) {
      const queryrRegExp = new RegExp(filter.query, 'i');

      filterCallbacks.push((session: SessionObj) => {
        return queryrRegExp.test(session.title);
      });
    }

    // Filter by session type
    if (filter?.sessionType) {
      filterCallbacks.push((session: SessionObj) => {
        return session.type === filter.sessionType;
      });
    }

    // Filter by start date
    if (filter?.startDateGte) {
      filterCallbacks.push((session: SessionObj) => {
        if (session.startDateTime && filter.startDateGte) {
          return new Date(session.startDateTime).getTime() >= new Date(filter.startDateGte).getTime() / 1000;
        }

        return false;
      });
    }

    // Filter by end date
    if (filter?.endDateLte) {
      filterCallbacks.push((session: SessionObj) => {
        if (session.endDateTime && filter.endDateLte) {
          return new Date(session.startDateTime).getTime() <= new Date(filter.endDateLte).getTime() / 1000;
        }

        return false;
      });
    }

    if (filterCallbacks.length === 0) {
      return sessions;
    }

    return sessions.filter((session) => {
      return filterCallbacks.every((cb) => cb(session));
    });
  }, [filter.endDateLte, filter.query, filter.sessionType, filter.startDateGte, sessions]);
}
