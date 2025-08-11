import type { RouteObject } from 'react-router';
import { PhotoEditorPage } from './index';

export const photoEditorRoute: RouteObject = {
  path: '/photo-editor',
  element: <PhotoEditorPage />,
};
