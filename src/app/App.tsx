import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SessionsStore } from '~entities/session';
import RootPage from '~pages/root';

import './global.css';

// TODO - enable lazy load for page elements
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '/',
        lazy: async () => {
          return import('~pages/sessions').then(({ route }) => route);
        },
      },
      {
        path: 'session/create',
        lazy: async () => {
          return import('~pages/create-session').then(({ route }) => route);
        },
      },
      {
        path: 'session/:sessionId',
        lazy: async () => {
          return import('~pages/session').then(({ route }) => route);
        },
      },
      {
        path: 'session/:sessionId/update',
        lazy: async () => {
          return import('~pages/update-session').then(({ route }) => route);
        },
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
