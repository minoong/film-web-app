import { Box, Container, Heading, Text } from '@radix-ui/themes';
import { APP } from '@/shared/config';

/**
 * 레시피 목록 페이지
 */
export const RecipesPage = () => {
  return (
    <Container size="4">
      <Box py="8">
        <Heading size="8" weight="bold" mb="4">
          모든 레시피
        </Heading>
        <Text size="5" color="gray">
          {APP.NAME} 시뮬레이션 레시피 목록이 여기에 표시됩니다.
        </Text>
      </Box>
    </Container>
  );
};
