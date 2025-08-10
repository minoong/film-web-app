import { Box, Container, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { HamburgerMenuIcon, CameraIcon } from '@radix-ui/react-icons';
import { useSpyElem } from '@/shared/lib/hooks';

export const Header = () => {
  const { ref, marginTop } = useSpyElem({
    elemHeight: 60,
    threshold: 50,
  });

  return (
    <Box
      asChild
      position="fixed"
      top="0"
      left="0"
      right="0"
      width="100%"
      style={{
        zIndex: 1000,
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'var(--color-background)',
        marginTop: `${marginTop}px`,
      }}
    >
      <header ref={ref}>
        <Box py="3" px="4">
          <Container size="4" style={{ maxWidth: '100%' }}>
            <Flex align="center" justify="between" width="100%">
              {/* Logo */}
              <Flex align="center" gap="2" style={{ minWidth: 0, flex: '0 0 auto' }}>
                <CameraIcon width="20" height="20" />
                <Heading size="4" weight="bold" style={{ whiteSpace: 'nowrap' }}>
                  Se-kai Film Recipes
                </Heading>
              </Flex>

              {/* Mobile Menu Button */}
              <Box display={{ initial: 'block', md: 'none' }} style={{ flex: '0 0 auto' }}>
                <IconButton variant="ghost" size="2">
                  <HamburgerMenuIcon width="18" height="18" />
                </IconButton>
              </Box>

              {/* Desktop Navigation */}
              <Flex gap="4" align="center" display={{ initial: 'none', md: 'flex' }} style={{ flex: '0 0 auto' }}>
                <Text size="2" weight="medium" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  레시피
                </Text>
                <Text size="2" weight="medium" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  인기
                </Text>
                <Text size="2" weight="medium" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  즐겨찾기
                </Text>
                <Text size="2" weight="medium" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  설정
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </header>
    </Box>
  );
};
