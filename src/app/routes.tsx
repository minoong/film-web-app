import type { RouteObject } from 'react-router';
import Root from './root';
import HomePage from '../pages/HomePage/route';
import { RecipesPage } from '../pages/RecipesPage';
import { FavoritesPage } from '../pages/FavoritesPage';

/**
 * 애플리케이션의 라우트 설정
 * React Router v7 Framework Mode 구조를 활용한 nested routing
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recipes',
        element: <RecipesPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      // 추후 추가 예정 라우트들
      // {
      //   path: 'recipes/:id',
      //   element: <RecipeDetailPage />,
      // },
      // {
      //   path: 'settings',
      //   element: <SettingsPage />,
      // },
      // {
      //   path: 'categories/:category',
      //   element: <CategoryPage />,
      // },
    ],
  },
];

export default routes;
