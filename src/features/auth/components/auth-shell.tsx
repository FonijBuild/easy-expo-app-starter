import { AppHeader, AppLogo, AppScreen } from '@/shared/components';
import { VStack } from '@/shared/components/ui';
import type { PropsWithChildren, ReactNode } from 'react';

type AuthShellProps = PropsWithChildren<{
  title: string;
  description?: string;
  back?: boolean;
  footer?: ReactNode;
}>;

export function AuthShell({
  title,
  description,
  back = true,
  footer,
  children,
}: AuthShellProps) {
  return (
    <AppScreen scroll keyboardAware contentClassName="min-h-full justify-center py-8">
      <VStack space="2xl">
        <AppLogo compact />
        <VStack space="lg">
          <AppHeader title={title} description={description} back={back} />
          <VStack space="lg">{children}</VStack>
        </VStack>
        {footer}
      </VStack>
    </AppScreen>
  );
}
