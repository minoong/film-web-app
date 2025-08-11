import { Button, Callout, Flex } from '@radix-ui/themes';
import { usePWA } from '@/shared/lib/hooks/usePWA';

export function PWAPrompt() {
  const { needRefresh, offlineReady, updateApp, close } = usePWA();

  if (!needRefresh && !offlineReady) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000,
        maxWidth: '400px',
      }}
    >
      {needRefresh && (
        <Callout.Root color="blue">
          <Callout.Text>새로운 업데이트가 있습니다!</Callout.Text>
          <Flex gap="2" mt="2">
            <Button size="1" onClick={updateApp}>
              업데이트
            </Button>
            <Button size="1" variant="soft" onClick={close}>
              나중에
            </Button>
          </Flex>
        </Callout.Root>
      )}

      {offlineReady && (
        <Callout.Root color="green">
          <Callout.Text>앱이 오프라인에서 사용할 준비가 되었습니다!</Callout.Text>
          <Flex gap="2" mt="2">
            <Button size="1" variant="soft" onClick={close}>
              확인
            </Button>
          </Flex>
        </Callout.Root>
      )}
    </div>
  );
}
