import type { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type ViewProps,
} from 'react-native';
import {
  SafeAreaView,
  type Edge,
} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { appConfig } from '@/shared/config';
import { cn } from '@/shared/lib/cn';

const StyledSafeAreaView = styled(SafeAreaView);

type AppScreenProps = PropsWithChildren<{
  scroll?: boolean;
  keyboardAware?: boolean;
  className?: string;
  contentClassName?: string;
  safeEdges?: Edge[];
}> &
  Pick<ViewProps, 'testID'>;

export function AppScreen({
  children,
  scroll = false,
  keyboardAware = false,
  className,
  contentClassName,
  safeEdges = ['top', 'right', 'bottom', 'left'],
  testID,
}: AppScreenProps) {
  const contentStyle = { maxWidth: appConfig.layout.maxContentWidth };
  const content = scroll ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName="grow"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View
        className={cn('mx-auto w-full flex-1 px-5 py-5', contentClassName)}
        style={contentStyle}
      >
        {children}
      </View>
    </ScrollView>
  ) : (
    <View
      className={cn('mx-auto w-full flex-1 px-5 py-5', contentClassName)}
      style={contentStyle}
    >
      {children}
    </View>
  );

  const body = keyboardAware ? (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <StyledSafeAreaView
      className={cn('flex-1 bg-background', className)}
      edges={safeEdges}
      testID={testID}
    >
      {body}
    </StyledSafeAreaView>
  );
}
