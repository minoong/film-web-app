import { useState } from 'react';
import { Box, Container, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { HamburgerMenuIcon, CameraIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router';
import { useSpyElem } from '@/shared/lib/hooks';
import { ROUTES, APP } from '@/shared/config';
import { MobileDrawer } from './MobileDrawer';

export const Header = () => {
  const { ref, marginTop } = useSpyElem({
    elemHeight: 60,
    threshold: 50,
  });
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 현재 경로에 따른 활성 상태 확인
  const isActive = (path: string) => {
    if (path === ROUTES.HOME && location.pathname === ROUTES.HOME) return true;
    if (path !== ROUTES.HOME && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <Box
        asChild
        position="fixed"
        top="0"
        left="0"
        right="0"
        width="100%"
        style={{
          zIndex: 1000,
          borderBottom: '1px solid rgba(57, 197, 187, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          marginTop: `${marginTop}px`,
        }}
      >
        <header ref={ref}>
          <Box py="3" px="4">
            <Container size="4" style={{ maxWidth: '100%' }}>
              <Flex align="center" justify="between" width="100%">
                {/* Logo */}
                <Flex align="center" gap="2" style={{ minWidth: 0, flex: '0 0 auto' }}>
                  <CameraIcon width="20" height="20" style={{ color: 'var(--teal-9)' }} />
                  <Link to={ROUTES.HOME} style={{ textDecoration: 'none', color: 'white' }}>
                    <Heading
                      size="4"
                      weight="bold"
                      style={{
                        whiteSpace: 'nowrap',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {APP.FULL_NAME}
                    </Heading>
                  </Link>
                </Flex>

                {/* Mobile Menu Button */}
                <Box display={{ initial: 'block', md: 'none' }} style={{ flex: '0 0 auto' }}>
                  <IconButton variant="ghost" size="2" onClick={() => setIsMobileMenuOpen(true)} color="teal">
                    <HamburgerMenuIcon width="18" height="18" />
                  </IconButton>
                </Box>

                {/* Desktop Navigation */}
                <Flex gap="4" align="center" display={{ initial: 'none', md: 'flex' }} style={{ flex: '0 0 auto' }}>
                  <Link to={ROUTES.RECIPES} style={{ textDecoration: 'none' }}>
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        whiteSpace: 'nowrap',
                        color: isActive(ROUTES.RECIPES) ? 'var(--teal-9)' : 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      레시피
                    </Text>
                  </Link>
                  <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        whiteSpace: 'nowrap',
                        color: isActive(ROUTES.HOME) ? 'var(--teal-9)' : 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      인기
                    </Text>
                  </Link>
                  <Link to={ROUTES.FAVORITES} style={{ textDecoration: 'none' }}>
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        whiteSpace: 'nowrap',
                        color: isActive(ROUTES.FAVORITES) ? 'var(--teal-9)' : 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      즐겨찾기
                    </Text>
                  </Link>
                  <Link to="/photo-editor" style={{ textDecoration: 'none' }}>
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        whiteSpace: 'nowrap',
                        color: isActive('/photo-editor') ? 'var(--teal-9)' : 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      포토 에디터
                    </Text>
                  </Link>
                  <Text
                    size="2"
                    weight="medium"
                    style={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      color: 'rgba(255,255,255,0.9)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    설정
                  </Text>
                </Flex>
              </Flex>
            </Container>
          </Box>
        </header>
      </Box>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
