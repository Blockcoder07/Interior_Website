import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';

const HomePage = lazy(() => import('@/pages/HomePage'));

/** One page with anchors (#about, #work, #services, #contact). */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
