/**
 * 애플리케이션 라우터 경로 상수
 * FSD 아키텍처에 따라 shared/config에서 중앙 관리
 */

export const ROUTES = {
  HOME: '/',
  RECIPES: '/recipes',
  RECIPE_DETAIL: '/recipes/:id',
  FAVORITES: '/favorites',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  CATEGORIES: '/categories/:category',
} as const;

/**
 * 동적 라우트 파라미터를 포함한 경로를 생성하는 헬퍼 함수들
 */
export const createRoute = {
  recipeDetail: (id: string) => `/recipes/${id}`,
  category: (category: string) => `/categories/${category}`,
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RoutePaths = (typeof ROUTES)[RouteKeys];
