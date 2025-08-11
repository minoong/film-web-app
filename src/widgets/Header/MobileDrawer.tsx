import { useEffect } from 'react';
import { Box, Flex, Text, IconButton, Separator, Badge } from '@radix-ui/themes';
import {
  Cross2Icon,
  HomeIcon,
  BookmarkIcon,
  CookieIcon,
  GearIcon,
  PersonIcon,
  CameraIcon,
} from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ROUTES, APP } from '@/shared/config';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const location = useLocation();

  // 드로어가 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body 스크롤 방지
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // 정리: 스크롤 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // 스크롤 위치 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // 현재 경로에 따른 활성 상태 확인
  const isActive = (path: string) => {
    if (path === ROUTES.HOME && location.pathname === ROUTES.HOME) return true;
    if (path !== ROUTES.HOME && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    {
      to: ROUTES.HOME,
      icon: <HomeIcon width="18" height="18" />,
      label: '홈',
      description: '인기 레시피와 추천',
    },
    {
      to: ROUTES.RECIPES,
      icon: <CookieIcon width="18" height="18" />,
      label: '모든 레시피',
      description: '후지필름 시뮬레이션 레시피',
      badge: 'New',
    },
    {
      to: ROUTES.FAVORITES,
      icon: <BookmarkIcon width="18" height="18" />,
      label: '즐겨찾기',
      description: '저장한 레시피 모음',
    },
    {
      to: '/photo-editor',
      icon: <CameraIcon width="18" height="18" />,
      label: '포토 에디터',
      description: '필름 시뮬레이션 사진 편집',
      badge: 'New',
    },
  ];

  const secondaryItems = [
    {
      to: ROUTES.SETTINGS,
      icon: <GearIcon width="18" height="18" />,
      label: '설정',
      description: '앱 설정 및 기본값',
    },
    {
      to: ROUTES.PROFILE,
      icon: <PersonIcon width="18" height="18" />,
      label: '프로필',
      description: '계정 및 개인정보',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1500,
              backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: 0.4,
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '320px',
              backgroundImage: 'url(/images/miku-drawer.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1600,
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Background overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
                zIndex: 1,
              }}
            />

            {/* Content container */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
              }}
            >
              <Flex direction="column" height="100%">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Box
                    p="4"
                    style={{
                      borderBottom: '1px solid rgba(57, 197, 187, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <Flex align="center" justify="between">
                      <Flex align="center" gap="2">
                        <motion.div
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                        >
                          <CookieIcon width="20" height="20" style={{ color: 'var(--teal-9)' }} />
                        </motion.div>
                        <Text
                          size="4"
                          weight="bold"
                          style={{
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                          }}
                        >
                          메뉴
                        </Text>
                      </Flex>
                      <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          variant="ghost"
                          size="2"
                          onClick={onClose}
                          style={{
                            color: 'white',
                          }}
                        >
                          <Cross2Icon width="16" height="16" />
                        </IconButton>
                      </motion.div>
                    </Flex>
                  </Box>
                </motion.div>

                {/* Navigation Items */}
                <Box p="3" style={{ flex: 1 }}>
                  <Flex direction="column" gap="1">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to={item.to} style={{ textDecoration: 'none' }} onClick={onClose}>
                          <Box
                            p="3"
                            style={{
                              borderRadius: '12px',
                              backgroundColor: isActive(item.to)
                                ? 'rgba(57, 197, 187, 0.2)'
                                : 'rgba(255, 255, 255, 0.1)',
                              border: isActive(item.to)
                                ? '1px solid rgba(57, 197, 187, 0.4)'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Flex align="center" gap="3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                style={{
                                  color: isActive(item.to) ? 'var(--teal-9)' : 'rgba(255, 255, 255, 0.8)',
                                }}
                              >
                                {item.icon}
                              </motion.div>
                              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                                <Flex align="center" gap="2">
                                  <Text
                                    size="3"
                                    weight="medium"
                                    style={{
                                      color: isActive(item.to) ? 'var(--teal-9)' : 'white',
                                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                    }}
                                  >
                                    {item.label}
                                  </Text>
                                  {item.badge && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.3 + index * 0.05, type: 'spring' }}
                                    >
                                      <Badge size="1" variant="solid" color="teal">
                                        {item.badge}
                                      </Badge>
                                    </motion.div>
                                  )}
                                </Flex>
                                <Text
                                  size="1"
                                  style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                  }}
                                >
                                  {item.description}
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Link>
                      </motion.div>
                    ))}
                  </Flex>

                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Separator my="4" />
                  </motion.div>

                  {/* Secondary Items */}
                  <Flex direction="column" gap="1">
                    {secondaryItems.map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.4 + index * 0.05,
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to={item.to} style={{ textDecoration: 'none' }} onClick={onClose}>
                          <Box
                            p="3"
                            style={{
                              borderRadius: '12px',
                              backgroundColor: isActive(item.to)
                                ? 'rgba(57, 197, 187, 0.2)'
                                : 'rgba(255, 255, 255, 0.1)',
                              border: isActive(item.to)
                                ? '1px solid rgba(57, 197, 187, 0.4)'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Flex align="center" gap="3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                style={{
                                  color: isActive(item.to) ? 'var(--teal-9)' : 'rgba(255, 255, 255, 0.8)',
                                }}
                              >
                                {item.icon}
                              </motion.div>
                              <Flex direction="column" gap="1">
                                <Text
                                  size="3"
                                  weight="medium"
                                  style={{
                                    color: isActive(item.to) ? 'var(--teal-9)' : 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                  }}
                                >
                                  {item.label}
                                </Text>
                                <Text
                                  size="1"
                                  style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                  }}
                                >
                                  {item.description}
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Link>
                      </motion.div>
                    ))}
                  </Flex>
                </Box>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Box
                    p="4"
                    style={{
                      borderTop: '1px solid rgba(57, 197, 187, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <Text
                      size="1"
                      align="center"
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      }}
                    >
                      {APP.FULL_NAME} {APP.VERSION}
                    </Text>
                  </Box>
                </motion.div>
              </Flex>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
