import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './app/routes';

/**
 * React Router v7 Framework Mode를 활용한 라우터 설정
 */
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
