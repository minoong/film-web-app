import { Box, Container, Flex, Heading, Text, Button, Card, Badge } from '@radix-ui/themes';
import { MagnifyingGlassIcon, HeartIcon, StarIcon } from '@radix-ui/react-icons';

export const HomePage = () => {
  // 예시 레시피 데이터
  const featuredRecipes = [
    {
      id: 1,
      name: 'Velvia (Vivid)',
      description: '선명하고 포화도 높은 컬러로 풍경 사진에 최적',
      category: '풍경',
      likes: 245,
      rating: 4.8,
      image: '/api/placeholder/300/200',
    },
    {
      id: 2,
      name: 'Classic Chrome',
      description: '차분하고 클래식한 톤의 일상 스냅',
      category: '일상',
      likes: 189,
      rating: 4.6,
      image: '/api/placeholder/300/200',
    },
    {
      id: 3,
      name: 'Acros (B&W)',
      description: '깊이 있는 흑백 톤의 아트 필름',
      category: '흑백',
      likes: 167,
      rating: 4.9,
      image: '/api/placeholder/300/200',
    },
  ];

  return (
    <Container size="4">
      {/* Hero Section */}
      <Box py="8">
        <Flex direction="column" align="center" gap="6" style={{ textAlign: 'center' }}>
          <Heading size="8" weight="bold">
            후지필름 시뮬레이션 레시피
          </Heading>
          <Text size="5" color="gray" style={{ maxWidth: '600px' }}>
            모바일에서 간편하게 사용할 수 있는 후지필름 카메라 설정 레시피를 찾아보세요
          </Text>

          {/* Search Bar */}
          <Box style={{ width: '100%', maxWidth: '500px' }}>
            <Flex gap="2">
              <Box style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="레시피 검색..."
                  style={{
                    padding: '12px 16px 12px 40px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '16px',
                  }}
                />
                <MagnifyingGlassIcon
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-low-contrast)',
                  }}
                  width="16"
                  height="16"
                />
              </Box>
              <Button size="3">검색</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Featured Recipes */}
      <Box py="6">
        <Flex direction="column" gap="6">
          <Heading size="6" weight="bold">
            인기 레시피
          </Heading>

          <Flex gap="4" direction={{ initial: 'column', sm: 'row' }} style={{ overflowX: 'auto' }}>
            {featuredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                style={{
                  minWidth: '280px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                className="hover:scale-105"
              >
                <Flex direction="column" gap="3">
                  {/* Recipe Image Placeholder */}
                  <Box
                    style={{
                      height: '180px',
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text color="gray">레시피 미리보기</Text>
                  </Box>

                  {/* Recipe Info */}
                  <Flex direction="column" gap="2">
                    <Flex justify="between" align="start">
                      <Heading size="4" weight="bold">
                        {recipe.name}
                      </Heading>
                      <Badge variant="soft" color="blue">
                        {recipe.category}
                      </Badge>
                    </Flex>

                    <Text size="2" color="gray">
                      {recipe.description}
                    </Text>

                    <Flex justify="between" align="center" mt="2">
                      <Flex gap="3" align="center">
                        <Flex gap="1" align="center">
                          <HeartIcon width="14" height="14" color="red" />
                          <Text size="2" color="gray">
                            {recipe.likes}
                          </Text>
                        </Flex>
                        <Flex gap="1" align="center">
                          <StarIcon width="14" height="14" color="orange" />
                          <Text size="2" color="gray">
                            {recipe.rating}
                          </Text>
                        </Flex>
                      </Flex>
                      <Button variant="soft" size="1">
                        보기
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Categories */}
      <Box py="6">
        <Flex direction="column" gap="4">
          <Heading size="6" weight="bold">
            카테고리
          </Heading>

          <Flex wrap="wrap" gap="3">
            {['풍경', '인물', '일상', '흑백', '빈티지', '모던'].map((category) => (
              <Button key={category} variant="outline" size="2">
                {category}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Additional Content for Scroll Testing */}
      <Box py="6">
        <Flex direction="column" gap="6">
          <Heading size="6" weight="bold">
            최근 추가된 레시피
          </Heading>

          {/* Duplicate recipes for scroll testing */}
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={`recent-${index}`} style={{ padding: '20px' }}>
              <Flex direction="column" gap="3">
                <Heading size="4" weight="bold">
                  레시피 #{index + 1}
                </Heading>
                <Text size="3" color="gray">
                  스크롤 테스트를 위한 더미 콘텐츠입니다. 헤더가 스크롤에 따라 숨겨지고 나타나는지 확인해보세요.
                </Text>
                <Box style={{ height: '150px', backgroundColor: 'var(--color-surface)' }}>
                  <Flex align="center" justify="center" style={{ height: '100%' }}>
                    <Text color="gray">레시피 이미지 영역</Text>
                  </Flex>
                </Box>
                <Text size="2" color="gray">
                  이 레시피는 후지필름의 {['Velvia', 'Provia', 'Astia', 'Classic Chrome'][index % 4]} 필름 시뮬레이션을
                  모바일에서 재현하기 위한 설정입니다. 스크롤을 위아래로 움직여서 헤더 애니메이션을 확인해보세요.
                </Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Box>
    </Container>
  );
};
