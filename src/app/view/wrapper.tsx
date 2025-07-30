'use client';

import { usePathname } from 'next/navigation';
import SupportButton from './supportButton';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOnRoutes = ['/login'];

  const shouldShowButton = !hideOnRoutes.includes(pathname);

  return (
    <>
      {children}
      {shouldShowButton && <SupportButton />}
    </>
  );
}
