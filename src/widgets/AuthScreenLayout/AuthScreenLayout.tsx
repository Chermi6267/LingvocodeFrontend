import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { createStyles } from '@/shared/lib/styles';
import { Box, Card, HStack, Icon, SafeAreaWrapper, Stack, Text, VStack } from '@/shared/ui';

export type AuthScreenLayoutProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
};

const useStyles = createStyles((tokens) => ({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: tokens.components.form.maxWidth,
    alignSelf: 'center',
  },
  brandMark: {
    width: tokens.components.iconButton.size,
    height: tokens.components.iconButton.size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
}));

/** Shared auth-screen shell: brand, safe area, keyboard avoidance and centered form card. */
export function AuthScreenLayout({ title, subtitle, children, footer }: AuthScreenLayoutProps) {
  const styles = useStyles();

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Box style={styles.content}>
            <VStack gap="xl">
              <VStack gap="sm" align="center">
                <HStack gap="sm" align="center">
                  <Box radius="pill" background="primary.tint" style={styles.brandMark}>
                    <Icon
                      name={{
                        ios: 'text.book.closed.fill',
                        android: 'menu_book',
                        web: 'menu_book',
                      }}
                      size="sm"
                      color="primary.lip"
                    />
                  </Box>
                  <Text variant="h3" color="primary.lip">
                    Lingvocode
                  </Text>
                </HStack>

                <Text variant="h1" style={styles.title}>
                  {title}
                </Text>
                {subtitle ? (
                  <Text tone="secondary" style={styles.subtitle}>
                    {subtitle}
                  </Text>
                ) : null}
              </VStack>

              <Card variant="info">
                <Stack gap="sm">{children}</Stack>
              </Card>

              {footer ? <Box style={styles.footer}>{footer}</Box> : null}
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}
