import { Box, Container, Flex, Text, Link } from '@radix-ui/themes';
import { APP } from '@/shared/config';

export const Footer = () => {
  return (
    <Box py="6" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Container size="4">
        <Flex direction="column" gap="4">
          {/* Main Footer Content */}
          <Flex
            direction={{ initial: 'column', md: 'row' }}
            justify="between"
            align={{ initial: 'center', md: 'start' }}
            gap="6"
          >
            {/* Brand */}
            <Flex direction="column" gap="2" align={{ initial: 'center', md: 'start' }}>
              <Text size="4" weight="bold">
                Se-kai Film Recipes
              </Text>
              <Text size="2" color="gray">
                모바일을 위한 {APP.NAME} 시뮬레이션 레시피
              </Text>
            </Flex>

            {/* Links */}
            <Flex gap="6" direction={{ initial: 'column', sm: 'row' }}>
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium">
                  레시피
                </Text>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  인기 레시피
                </Link>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  최신 레시피
                </Link>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  카테고리
                </Link>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="3" weight="medium">
                  지원
                </Text>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  도움말
                </Link>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  문의하기
                </Link>
                <Link size="2" color="gray" href="#" style={{ textDecoration: 'none' }}>
                  피드백
                </Link>
              </Flex>
            </Flex>
          </Flex>

          {/* Divider */}
          <Box style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

          {/* Bottom Footer */}
          <Flex direction="column" justify="center" align="center" gap="4">
            <Flex direction="column" gap="1" align="center">
              <Text size="1" color="gray">
                프로젝트 세카이 캐릭터 설정 및 이미지 출처:
              </Text>
              <Text size="1" color="gray">
                Project SEKAI COLORFUL STAGE!
              </Text>
              <Text size="1" color="gray">
                © 2025 {APP.FULL_NAME}. Film simulation recipes.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
