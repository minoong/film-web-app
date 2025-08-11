import { Box, Flex } from '@radix-ui/themes';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Layout = ({ children, header, footer }: LayoutProps) => {
  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      {/* Header - fixed positioning */}
      {header}

      {/* Main Content with top padding to account for fixed header */}
      <Box style={{ flex: 1, paddingTop: header ? '60px' : '0' }}>{children}</Box>

      {/* Footer */}
      {footer && (
        <Box
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-background)',
          }}
        >
          {footer}
        </Box>
      )}
    </Flex>
  );
};
