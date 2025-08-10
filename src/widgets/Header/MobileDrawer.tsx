import { Box, Flex, Text, IconButton, Separator, Badge } from '@radix-ui/themes';
import { Cross2Icon, HomeIcon, BookmarkIcon, CookieIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const location = useLocation();

  // 현재 경로에 따른 활성 상태 확인
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    {
      to: '/',
      icon: <HomeIcon width="18" height="18" />,
      label: '홈',
      description: '인기 레시피와 추천',
    },
    {
      to: '/recipes',
      icon: <CookieIcon width="18" height="18" />,
      label: '모든 레시피',
      description: '후지필름 시뮬레이션 레시피',
      badge: 'New',
    },
    {
      to: '/favorites',
      icon: <BookmarkIcon width="18" height="18" />,
      label: '즐겨찾기',
      description: '저장한 레시피 모음',
    },
  ];

  const secondaryItems = [
    {
      to: '/settings',
      icon: <GearIcon width="18" height="18" />,
      label: '설정',
      description: '앱 설정 및 기본값',
    },
    {
      to: '/profile',
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
              width: '280px',
              backgroundColor: 'var(--color-background)',
              zIndex: 1600,
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Flex direction="column" height="100%">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Box p="4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Flex align="center" justify="between">
                    <Flex align="center" gap="2">
                      <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                      >
                        <CookieIcon width="20" height="20" />
                      </motion.div>
                      <Text size="4" weight="bold">
                        메뉴
                      </Text>
                    </Flex>
                    <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
                      <IconButton variant="ghost" size="2" onClick={onClose}>
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
                            borderRadius: '8px',
                            backgroundColor: isActive(item.to) ? 'var(--accent-3)' : 'transparent',
                            border: isActive(item.to) ? '1px solid var(--accent-6)' : '1px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Flex align="center" gap="3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              style={{
                                color: isActive(item.to) ? 'var(--accent-9)' : 'var(--gray-11)',
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
                                    color: isActive(item.to) ? 'var(--accent-12)' : 'inherit',
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
                                    <Badge size="1" variant="soft" color="blue">
                                      {item.badge}
                                    </Badge>
                                  </motion.div>
                                )}
                              </Flex>
                              <Text size="1" color="gray">
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
                            borderRadius: '8px',
                            backgroundColor: isActive(item.to) ? 'var(--accent-3)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Flex align="center" gap="3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              style={{
                                color: isActive(item.to) ? 'var(--accent-9)' : 'var(--gray-11)',
                              }}
                            >
                              {item.icon}
                            </motion.div>
                            <Flex direction="column" gap="1">
                              <Text
                                size="3"
                                weight="medium"
                                style={{
                                  color: isActive(item.to) ? 'var(--accent-12)' : 'inherit',
                                }}
                              >
                                {item.label}
                              </Text>
                              <Text size="1" color="gray">
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
                <Box p="4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <Text size="1" color="gray" align="center">
                    Fuji Film Recipes v1.0
                  </Text>
                </Box>
              </motion.div>
            </Flex>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
