import { useSessionsStore } from '~entities/session';

import { UpdateSessionPage } from '../ui';

export const route = {
  element: <UpdateSessionPage />,
  loader: async () => {
    // TODO - load single session
    return await useSessionsStore.getState().fetchSessions();
  },
};
