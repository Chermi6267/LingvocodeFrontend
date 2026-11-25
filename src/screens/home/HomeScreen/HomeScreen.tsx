import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import type { ThemeColorLike } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';
import { useTheme } from '@/shared/lib/theme';
import {
  AppBar,
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  IconButton,
  ListItem,
  ProgressBar,
  SafeAreaWrapper,
  Tabs,
  Text,
  useToast,
  VStack,
  type IconName,
  type TabItem,
} from '@/shared/ui';

type Section = 'courses' | 'achievements' | 'activity';

type Course = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: IconName;
  readonly tint: ThemeColorLike;
  readonly color: ThemeColorLike;
};

type Achievement = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
  readonly earned: boolean;
  readonly tint: ThemeColorLike;
  readonly color: ThemeColorLike;
};

const TABS: readonly TabItem<Section>[] = [
  { value: 'courses', label: 'Курсы' },
  { value: 'achievements', label: 'Достижения' },
  { value: 'activity', label: 'Активность' },
];

const COURSES: readonly Course[] = [
  {
    id: 'english',
    title: 'Английский',
    subtitle: '12 из 60 уроков · A2',
    icon: { ios: 'text.book.closed.fill', android: 'menu_book', web: 'menu_book' },
    tint: 'secondary.tint',
    color: 'secondary.lip',
  },
  {
    id: 'german',
    title: 'Немецкий',
    subtitle: '4 из 48 уроков · A1',
    icon: { ios: 'graduationcap.fill', android: 'school', web: 'school' },
    tint: 'legendary.tint',
    color: 'legendary.lip',
  },
  {
    id: 'spanish',
    title: 'Испанский',
    subtitle: 'Начните с нуля',
    icon: { ios: 'globe', android: 'translate', web: 'translate' },
    tint: 'warning.tint',
    color: 'warning.lip',
  },
];

const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Первый шаг',
    description: 'Пройден первый урок',
    icon: { ios: 'star.fill', android: 'star', web: 'star' },
    earned: true,
    tint: 'warning.tint',
    color: 'warning.lip',
  },
  {
    id: 'week-streak',
    title: 'Неделя силы',
    description: 'Серия из 7 дней',
    icon: { ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' },
    earned: true,
    tint: 'streak.tint',
    color: 'streak.lip',
  },
  {
    id: 'perfect-round',
    title: 'Без ошибок',
    description: 'Идеальный раунд из 10 ответов',
    icon: { ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' },
    earned: false,
    tint: 'primary.tint',
    color: 'primary.lip',
  },
];

const WEEK_ACTIVITY = [
  { id: 'mon', label: 'Пн', value: 35 },
  { id: 'tue', label: 'Вт', value: 60 },
  { id: 'wed', label: 'Ср', value: 90 },
  { id: 'thu', label: 'Чт', value: 45 },
  { id: 'fri', label: 'Пт', value: 70 },
  { id: 'sat', label: 'Сб', value: 20 },
  { id: 'sun', label: 'Вс', value: 10 },
] as const;

const MAX_ACTIVITY = 90;

const useStyles = createStyles((tokens) => ({
  scrollContent: {
    paddingBottom: tokens.spacing.huge,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
    gap: tokens.spacing.xl,
  },
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
  heroIcon: {
    width: tokens.spacing.huge,
    height: tokens.spacing.huge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    width: tokens.components.control.hitTarget,
    height: tokens.components.control.hitTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIcon: {
    width: tokens.spacing.xxxl,
    height: tokens.spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    height: tokens.spacing.huge,
  },
}));

type StatCardProps = {
  readonly icon: IconName;
  readonly value: string;
  readonly label: string;
  readonly tint: ThemeColorLike;
  readonly color: ThemeColorLike;
};

function StatCard({ icon, value, label, tint, color }: StatCardProps) {
  const styles = useStyles();

  return (
    <Box
      flex={1}
      padding="md"
      radius="lg"
      background="bgSurface"
      borderWidth="default"
      borderColor="borderDefault">
      <VStack align="center" gap="xs">
        <Box radius="pill" background={tint} style={styles.statIcon}>
          <Icon name={icon} size="sm" color={color} />
        </Box>
        <Text variant="h3" numberOfLines={1}>
          {value}
        </Text>
        <Text variant="caption" tone="secondary" numberOfLines={1}>
          {label}
        </Text>
      </VStack>
    </Box>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { themeName, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const styles = useStyles();

  const [section, setSection] = useState<Section>('courses');

  const showDemoNotice = () => {
    showToast({
      variant: 'info',
      message: 'Демо-режим: интерактивные уроки появятся на следующем этапе.',
    });
  };

  return (
    <SafeAreaWrapper>
      <AppBar
        title="Lingvocode"
        safeArea={false}
        actions={
          <HStack gap="xs" align="center">
            <Box paddingHorizontal="sm" paddingVertical="xs" radius="pill" background="streak.tint">
              <HStack gap="xs" align="center">
                <Icon
                  name={{
                    ios: 'flame.fill',
                    android: 'local_fire_department',
                    web: 'local_fire_department',
                  }}
                  size="xs"
                  color="streak.lip"
                />
                <Text variant="label" color="streak.lip">
                  7
                </Text>
              </HStack>
            </Box>
            <IconButton
              accessibilityLabel="Переключить тему"
              icon={({ color }) => (
                <Icon
                  name={
                    themeName === 'dark'
                      ? { ios: 'sun.max.fill', android: 'light_mode', web: 'light_mode' }
                      : { ios: 'moon.fill', android: 'dark_mode', web: 'dark_mode' }
                  }
                  size="sm"
                  color={color}
                />
              )}
              onPress={toggleTheme}
            />
          </HStack>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Box style={styles.content}>
          <Card variant="info">
            <VStack gap="lg">
              <HStack gap="md" align="center">
                <Box flex={1}>
                  <VStack gap="xs">
                    <Text variant="h2">Привет, чемпион!</Text>
                    <Text tone="secondary">
                      Продолжай учить английский — до дневной цели осталось совсем немного.
                    </Text>
                  </VStack>
                </Box>
                <Box radius="pill" background="streak.tint" style={styles.heroIcon}>
                  <Icon
                    name={{
                      ios: 'flame.fill',
                      android: 'local_fire_department',
                      web: 'local_fire_department',
                    }}
                    size="lg"
                    color="streak.base"
                  />
                </Box>
              </HStack>

              <VStack gap="sm">
                <HStack justify="between" align="center">
                  <Text variant="label">Дневная цель</Text>
                  <Text variant="label" color="primary.lip">
                    30 / 50 XP
                  </Text>
                </HStack>
                <ProgressBar value={30} max={50} accessibilityLabel="Дневная цель: 30 из 50 XP" />
                <Text variant="caption" tone="secondary">
                  Ещё 20 XP, чтобы сохранить серию.
                </Text>
              </VStack>

              <Button
                fullWidth
                leftIcon={
                  <Icon
                    name={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
                    size="sm"
                    color="textOnAccent"
                  />
                }
                onPress={showDemoNotice}>
                Продолжить урок
              </Button>
            </VStack>
          </Card>

          <HStack gap="sm">
            <StatCard
              icon={{
                ios: 'flame.fill',
                android: 'local_fire_department',
                web: 'local_fire_department',
              }}
              value="7"
              label="дней подряд"
              tint="streak.tint"
              color="streak.lip"
            />
            <StatCard
              icon={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
              value="1 250"
              label="XP всего"
              tint="warning.tint"
              color="warning.lip"
            />
            <StatCard
              icon={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
              value="12"
              label="уровень"
              tint="legendary.tint"
              color="legendary.lip"
            />
          </HStack>

          <VStack gap="md">
            <Tabs
              tabs={TABS}
              value={section}
              onValueChange={setSection}
              accessibilityLabel="Разделы главной страницы"
            />

            {section === 'courses' ? (
              <VStack gap="sm">
                {COURSES.map((course) => (
                  <ListItem
                    key={course.id}
                    title={course.title}
                    subtitle={course.subtitle}
                    accessibilityLabel={`Открыть курс ${course.title}`}
                    leftSlot={
                      <Box
                        radius="md"
                        padding="sm"
                        background={course.tint}
                        style={styles.centeredIcon}>
                        <Icon name={course.icon} size="sm" color={course.color} />
                      </Box>
                    }
                    rightSlot={
                      <Icon
                        name={{
                          ios: 'chevron.right',
                          android: 'chevron_right',
                          web: 'chevron_right',
                        }}
                        size="sm"
                        tone="secondary"
                      />
                    }
                    onPress={showDemoNotice}
                  />
                ))}
              </VStack>
            ) : null}

            {section === 'achievements' ? (
              <VStack gap="sm">
                {ACHIEVEMENTS.map((achievement) => (
                  <Card key={achievement.id} variant="info" disabled={!achievement.earned}>
                    <HStack gap="md" align="center" style={styles.centeredIcon}>
                      <Box
                        radius="pill"
                        background={achievement.tint}
                        style={styles.achievementIcon}>
                        <Icon
                          name={
                            achievement.earned
                              ? achievement.icon
                              : { ios: 'lock.fill', android: 'lock', web: 'lock' }
                          }
                          size="sm"
                          color={achievement.earned ? achievement.color : 'textDisabled'}
                        />
                      </Box>
                      <Box flex={1}>
                        <VStack gap="xxs">
                          <Text variant="label" tone={achievement.earned ? 'primary' : 'disabled'}>
                            {achievement.title}
                          </Text>
                          <Text
                            variant="bodySmall"
                            tone={achievement.earned ? 'secondary' : 'disabled'}>
                            {achievement.description}
                          </Text>
                        </VStack>
                      </Box>
                      <Text
                        variant="caption"
                        color={achievement.earned ? 'primary.lip' : 'textDisabled'}>
                        {achievement.earned ? 'Получено' : 'Закрыто'}
                      </Text>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            ) : null}

            {section === 'activity' ? (
              <Card variant="info">
                <VStack gap="lg">
                  <HStack justify="between" align="center">
                    <Text variant="h3">Эта неделя</Text>
                    <Text variant="label" color="primary.lip">
                      330 XP
                    </Text>
                  </HStack>

                  <HStack gap="sm" align="end" style={styles.chart}>
                    {WEEK_ACTIVITY.map((day) => {
                      const height = Math.max(8, Math.round((day.value / MAX_ACTIVITY) * 56));

                      return (
                        <VStack key={day.id} flex={1} align="center" gap="xs">
                          <Box
                            width="100%"
                            height={height}
                            radius="sm"
                            background={
                              day.value === MAX_ACTIVITY ? 'primary.base' : 'primary.tint'
                            }
                          />
                          <Text variant="caption" tone="secondary">
                            {day.label}
                          </Text>
                        </VStack>
                      );
                    })}
                  </HStack>

                  <Divider />

                  <HStack gap="sm" align="center">
                    <Icon
                      name={{
                        ios: 'chart.line.uptrend.xyaxis',
                        android: 'trending_up',
                        web: 'trending_up',
                      }}
                      size="sm"
                      color="warning.base"
                    />
                    <Text variant="bodySmall" tone="secondary">
                      Лучший день — среда, 90 XP. Так держать!
                    </Text>
                  </HStack>
                </VStack>
              </Card>
            ) : null}
          </VStack>

          <Card variant="info">
            <VStack gap="md">
              <HStack gap="sm" align="center">
                <Icon
                  name={{
                    ios: 'checkmark.seal.fill',
                    android: 'workspace_premium',
                    web: 'workspace_premium',
                  }}
                  size="md"
                  color="primary.base"
                />
                <Text variant="h3">Сохрани свой прогресс</Text>
              </HStack>
              <Text tone="secondary">
                Создайте аккаунт, чтобы не потерять серию, достижения и историю занятий.
              </Text>
              <VStack gap="sm">
                <Button fullWidth onPress={() => router.push('/auth/register')}>
                  Регистрация
                </Button>
                <Button fullWidth variant="secondary" onPress={() => router.push('/auth/login')}>
                  Войти
                </Button>
              </VStack>
            </VStack>
          </Card>

          <Text variant="caption" tone="secondary" style={styles.footerText}>
            Lingvocode · учись в своём темпе
          </Text>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
