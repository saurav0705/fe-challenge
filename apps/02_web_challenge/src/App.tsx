import { MantineProvider } from '@mantine/core';
import './App.css';
import { ErrorBoundary, NotFoundPage } from './components/ErrorBoundary';
import { Home } from './screens/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailsPage } from './screens/DetailPage/DetailPage';
import { BootStrap } from './Bootstrap';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const router = createBrowserRouter([
  {
    element: <BootStrap />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/details/:org',
        element: <DetailsPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" zIndex={99999999} limit={1} />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default App;
