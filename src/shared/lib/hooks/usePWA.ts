import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function usePWA() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onOfflineReady() {
      setOfflineReady(true);
    },
    onRegistered(r) {
      // 서비스 워커 등록 성공
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      // 서비스 워커 등록 실패
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const updateApp = () => {
    updateServiceWorker(true);
  };

  return {
    needRefresh,
    offlineReady,
    updateApp,
    close,
  };
}
