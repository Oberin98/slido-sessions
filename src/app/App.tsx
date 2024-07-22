import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SessionsStore } from '~entities/session';
import CreateSessionPage from '~pages/create-session';
import RootPage from '~pages/root';
import SessionPage from '~pages/session';
import SessionsPage from '~pages/sessions';
import UpdateSessionPage from '~pages/update-session';

import './global.css';

// TODO - enable lazy load for page elements
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <SessionsPage />,
      },
      {
        path: 'session/create',
        element: <CreateSessionPage />,
      },
      {
        path: 'session/:sessionId',
        element: <SessionPage />,
      },
      {
        path: 'session/:sessionId/update',
        element: <UpdateSessionPage />,
      },
    ],
  },
]);

function App() {
  return (
    <SessionsStore>
      <RouterProvider router={router} />
    </SessionsStore>
  );
}

export default App;
