import { Box, Container, Flex, Heading, Text, Button, Card, Badge } from '@radix-ui/themes';
import { HeartIcon, StarIcon, CameraIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router';
import { APP } from '@/shared/config';

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
    <>
      {/* Fixed Background Image */}
      <Box
        className="background-image"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/images/miku-main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: -1,
          filter: 'brightness(0.3)', // 배경을 어둡게 해서 텍스트 가독성 향상
        }}
      />

      {/* Overlay for better readability */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
          zIndex: -1,
        }}
      />

      <Container size="3" style={{ maxWidth: '100%', padding: '0 16px' }}>
        {/* Hero Section */}
        <Box py="8" pt="12">
          <Flex direction="column" align="center" gap="6" style={{ textAlign: 'center' }}>
            <Heading
              size="7"
              weight="bold"
              style={{
                lineHeight: '1.2',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              }}
              color="teal"
            >
              {APP.FULL_NAME}
            </Heading>
            <Text
              size="4"
              style={{
                maxWidth: '500px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.9)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontSize: 'clamp(1rem, 3.5vw, 1.125rem)',
              }}
            >
              모바일에서 간편하게 사용할 수 있는 {APP.NAME} 카메라 설정 레시피를 찾아보세요
            </Text>

            {/* Photo Editor Button */}
            <Box style={{ width: '100%', maxWidth: '400px' }}>
              <Link to="/photo-editor" style={{ textDecoration: 'none' }}>
                <Button
                  size="4"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(57, 197, 187, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(57, 197, 187, 0.4)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px 24px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CameraIcon width="20" height="20" />
                  포토 에디터 시작하기
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>

        {/* Featured Recipes */}
        <Box py="6">
          <Flex direction="column" gap="6">
            <Heading
              size="6"
              weight="bold"
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              }}
            >
              인기 레시피
            </Heading>

            <Flex gap="4" direction="column">
              {featuredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  <Flex direction="column" gap="4" p="4">
                    {/* Recipe Image Placeholder */}
                    <Box
                      style={{
                        height: '160px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '14px',
                        }}
                      >
                        레시피 미리보기
                      </Text>
                    </Box>

                    {/* Recipe Info */}
                    <Flex direction="column" gap="3">
                      <Flex justify="between" align="start" gap="2">
                        <Heading
                          size="4"
                          weight="bold"
                          style={{
                            color: 'white',
                            fontSize: 'clamp(1rem, 3.5vw, 1.125rem)',
                          }}
                        >
                          {recipe.name}
                        </Heading>
                        <Badge
                          variant="solid"
                          color="teal"
                          style={{
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        >
                          {recipe.category}
                        </Badge>
                      </Flex>

                      <Text
                        size="3"
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: '1.5',
                          fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)',
                        }}
                      >
                        {recipe.description}
                      </Text>

                      <Flex justify="between" align="center" mt="2">
                        <Flex gap="4" align="center">
                          <Flex gap="1" align="center">
                            <HeartIcon width="16" height="16" style={{ color: '#ef4444' }} />
                            <Text
                              size="2"
                              style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '14px',
                              }}
                            >
                              {recipe.likes}
                            </Text>
                          </Flex>
                          <Flex gap="1" align="center">
                            <StarIcon width="16" height="16" style={{ color: '#f59e0b' }} />
                            <Text
                              size="2"
                              style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '14px',
                              }}
                            >
                              {recipe.rating}
                            </Text>
                          </Flex>
                        </Flex>
                        <Button
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
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
            <Heading
              size="6"
              weight="bold"
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              }}
            >
              카테고리
            </Heading>

            <Flex wrap="wrap" gap="3">
              {['풍경', '인물', '일상', '흑백', '빈티지', '모던'].map((category) => (
                <Button
                  key={category}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  {category}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Box>

        {/* Additional Content for Scroll Testing */}
        <Box py="6" pb="12">
          <Flex direction="column" gap="6">
            <Heading
              size="6"
              weight="bold"
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              }}
            >
              최근 추가된 레시피
            </Heading>

            {/* Duplicate recipes for scroll testing */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={`recent-${index}`}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <Flex direction="column" gap="4" p="4">
                  <Heading
                    size="4"
                    weight="bold"
                    style={{
                      color: 'white',
                      fontSize: 'clamp(1rem, 3.5vw, 1.125rem)',
                    }}
                  >
                    {['Velvia', 'Provia', 'Astia', 'Classic Chrome', 'Eterna'][index]} 레시피
                  </Heading>
                  <Text
                    size="3"
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: '1.5',
                      fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)',
                    }}
                  >
                    스크롤 테스트를 위한 더미 콘텐츠입니다. 헤더가 스크롤에 따라 숨겨지고 나타나는지 확인해보세요.
                  </Text>
                  <Box
                    style={{
                      height: '120px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Flex align="center" justify="center" style={{ height: '100%' }}>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '14px',
                        }}
                      >
                        레시피 이미지 영역
                      </Text>
                    </Flex>
                  </Box>
                  <Text
                    size="2"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: '1.4',
                      fontSize: '13px',
                    }}
                  >
                    이 레시피는 {APP.NAME}의 {['Velvia', 'Provia', 'Astia', 'Classic Chrome', 'Eterna'][index]} 필름
                    시뮬레이션을 모바일에서 재현하기 위한 설정입니다.
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>
      </Container>
    </>
  );
};
