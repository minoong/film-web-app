import { StrictMode } from 'react';
import { Theme } from '@radix-ui/themes';
import { Outlet } from 'react-router';
import { Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { PWAPrompt } from '@/widgets/PWAPrompt';
import '@radix-ui/themes/styles.css';
import '../main.css';

/**
 * Root 레이아웃 컴포넌트
 * 모든 페이지에 공통으로 적용되는 레이아웃
 */
export default function Root() {
  return (
    <StrictMode>
      <Theme accentColor="teal" grayColor="slate">
        <Layout header={<Header />} footer={<Footer />}>
          <Outlet />
          <PWAPrompt />
        </Layout>
      </Theme>
    </StrictMode>
  );
}
