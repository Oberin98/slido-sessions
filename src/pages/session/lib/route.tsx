import { useSessionsStore } from '~entities/session';

import { SessionPage } from '../ui';

export const route = {
  element: <SessionPage />,
  loader: async () => {
    return await useSessionsStore.getState().fetchSessions();
  },
};
