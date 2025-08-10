import type { RouteObject } from 'react-router';
import { HomePage } from './HomePage';

/**
 * 홈페이지 라우트 설정
 */
export const homeRoute: RouteObject = {
  path: '/',
  element: <HomePage />,
  index: true,
};

export default HomePage;
