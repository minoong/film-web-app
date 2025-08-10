import { Box, Container, Heading, Text } from '@radix-ui/themes';

/**
 * 즐겨찾기 페이지
 */
export const FavoritesPage = () => {
  return (
    <Container size="4">
      <Box py="8">
        <Heading size="8" weight="bold" mb="4">
          즐겨찾기
        </Heading>
        <Text size="5" color="gray">
          즐겨찾기한 레시피들이 여기에 표시됩니다.
        </Text>
      </Box>
    </Container>
  );
};
