/**
 * 애플리케이션 전역 상수
 */
export const APP = {
  NAME: 'Se-kai',
  FULL_NAME: 'Se-kai Film Recipes',
  VERSION: 'v1.0',
} as const;

export type AppKeys = keyof typeof APP;
