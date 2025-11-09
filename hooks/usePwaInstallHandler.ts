'use client';
import { useEffect, useState } from 'react';
import { pwaInstallHandler } from 'pwa-install-handler';

export function usePwaInstallHandler() {
  const [canInstall, setCanInstall] = useState(false);
  useEffect(() => {
    const listener = (installable:boolean) => {
      setCanInstall(installable);
    };
    pwaInstallHandler.addListener(listener);
    // On mount check initial state
    setCanInstall(pwaInstallHandler.canInstall());
    return () => {
      pwaInstallHandler.removeListener(listener);
    };
  }, []);
  const promptInstall = async () => {
    return await pwaInstallHandler.install();
  };
  return { canInstall, promptInstall };
}
