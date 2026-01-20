'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { IntroProvider, useIntro } from '@/context/intro-context';

function LayoutContent({ children }: { children: ReactNode }) {
  const { isIntroActive } = useIntro();

  return (
    <>
      {!isIntroActive && <Header />}
      <main className="min-h-screen" style={{ viewTransitionName: 'page-content' }}>
        {children}
      </main>
      {!isIntroActive && <Footer />}
    </>
  );
}

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <IntroProvider>
      <LayoutContent>{children}</LayoutContent>
    </IntroProvider>
  );
}
