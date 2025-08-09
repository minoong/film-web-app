import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
      <ThemePanel />
    </Theme>
  </StrictMode>
);
