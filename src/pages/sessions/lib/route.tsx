import { useSessionsStore } from '~entities/session';

import { SessionsPage } from '../ui';

export const route = {
  element: <SessionsPage />,
  loader: async () => {
    // TODO - use load single session
    return await useSessionsStore.getState().fetchSessions();
  },
};
