import type { RouteObject } from 'react-router';
import Root from './root';
import HomePage from '../pages/HomePage/route';
import { RecipesPage } from '../pages/RecipesPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { ROUTES } from '@/shared/config';

/**
 * 애플리케이션의 라우트 설정
 * React Router v7 Framework Mode 구조를 활용한 nested routing
 */
export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.RECIPES.slice(1), // Remove leading slash for nested routes
        element: <RecipesPage />,
      },
      {
        path: ROUTES.FAVORITES.slice(1), // Remove leading slash for nested routes
        element: <FavoritesPage />,
      },
      // 추후 추가 예정 라우트들
      // {
      //   path: ROUTES.RECIPE_DETAIL.slice(1),
      //   element: <RecipeDetailPage />,
      // },
      // {
      //   path: ROUTES.SETTINGS.slice(1),
      //   element: <SettingsPage />,
      // },
      // {
      //   path: ROUTES.CATEGORIES.slice(1),
      //   element: <CategoryPage />,
      // },
    ],
  },
];

export default routes;
