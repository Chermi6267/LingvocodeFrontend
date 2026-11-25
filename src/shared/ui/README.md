# UI-кит: фундамент Tactile 2.5D / Juicy UI

Этот каталог содержит фундамент визуальной системы и контролы:
`Button`, `TextInput`, `IconButton`, `Checkbox`, `Radio`, `Switch`, `Select`, `Slider`,
`Card`, `ListItem`, `Accordion`, `Spinner`, `Skeleton`, `ProgressBar`, `Alert`, `Modal`,
`BottomSheet`, `Toast`.
Легаси `SubmitButton` / `InputField` удалены; экраны авторизации используют публичный
API из `@/shared/ui`.

## Слои

```
shared/config/theme      токены: палитра, типографика, радиусы, motion             (готово ранее)
shared/lib/theme         ThemeProvider + useTheme                                  (готово ранее)
shared/lib/styles        createStyles(tokens) — типизированные StyleSheet-хуки
shared/lib/motion        usePressDepth / useShake / usePopIn / useSpringValue       (Reanimated 4)
                         useProgressValue — числовое 0..1 значение без layout-анимации
                         useSpin / usePulse — вращение и пульсация индикаторов
shared/lib/a11y          клавиатурные хелперы и useSpaceActivation для не-button ролей
shared/ui/TactileLayers  единственная реализация нижней объёмной грани
shared/ui/Pressable3D    интерактивная 2.5D-поверхность (press + hover + focus)
shared/ui/TactileSurface неинтерактивная 2.5D-поверхность (статические карточки)
shared/ui/Box            размеры, padding/margin, радиусы, фон и рамки на токенах (алиас Container)
shared/ui/Stack          направление, gap, выравнивание и свободное пространство (VStack / HStack)
shared/ui/SafeAreaWrapper вырезы, статус-бар, нижняя системная панель (iOS/Android/web)
shared/ui/AppBar         верхняя панель (алиас `Header`): title, back-callback, actions, safe-area
shared/ui/Tabs           переключатель подразделов: активное состояние, анимированный индикатор
shared/ui/Divider        горизонтальный/вертикальный разделитель borderDefault
shared/ui/Button         primary / secondary / danger / ghost, loading, 2.5D
shared/ui/IconButton     icon-only действие
shared/ui/Card           info / choice, selected / correct / wrong, бейдж 28×28
shared/ui/ListItem       заголовок, подзаголовок, левый/правый слоты, опциональный onPress
shared/ui/Accordion      раскрытие с анимацией высоты, вложенный контент остаётся смонтирован
shared/ui/Spinner        вращающаяся дуга на токенах темы
shared/ui/Skeleton       пульсирующая заглушка, формы line/rect/circle/pill
shared/ui/ProgressBar    16px pill, внутренний блик, spring-заполнение
shared/ui/Alert          инлайн-сообщение: info/success/warning/error, closable, action
shared/ui/Modal          центрированный диалог, backdrop, pop-in, system Back
shared/ui/BottomSheet    нижняя панель: default/success/error, swipe-to-close, safe-area
shared/ui/Toast          всплывающие сообщения через ToastProvider + useToast
shared/ui/Text           h1/h2/h3, body, caption, label, button; Nunito/Rubik из токенов
shared/ui/Icon           обёртка expo-symbols: размеры и цвета из токенов
shared/ui/TextInput      утопленное поле: focus/error/disabled, shake, пароль
shared/ui/Checkbox       controlled/uncontrolled, индикатор 8px, pop-in галочки
shared/ui/Radio          RadioGroup — строго один выбранный value, стрелки для перехода
shared/ui/Switch         двухсостояние, пружинный ползунок, 2.5D грань едет вместе с ним
shared/ui/Select         выпадающий список, измерение/flip/clamp, keyboard + outside tap
shared/ui/Slider         числовой диапазон min/max/step, drag/tap/keyboard, fill без reflow
```

Зависимости идут только вниз: `ui → lib → config`. Слой `shared` не импортирует
`app / screens / components / features`.

## Механика 2.5D

Реализация находится в `TactileLayers` и используется всеми компонентами:

- передняя поверхность — единственный элемент в layout-потоке;
- нижняя грань — `position: absolute` слой высотой `lipHeight` (4px), сдвинутый вниз;
- нажатие — `transform: translateY(lipHeight)` у передней поверхности;
- грань физически «прячется» под поверхностью, как при `box-shadow: 0 4px 0`.

Следствия:

- layout не пересчитывается, `borderBottomWidth` не меняется → **нет layout shift**;
- соседние элементы не двигаются;
- `disabled` рендерится без грани и с плоской заливкой `bgDisabled`;
- `loading` остаётся объёмным, но не принимает нажатия и отдаёт `accessibilityState.busy`;
- размытие не используется нигде (`shadowBlur: 0`, `elevation` запрещён).

Грань выступает за layout-бокс на 4px вниз (как и `box-shadow`), поэтому родитель
не должен обрезать overflow (`overflow: 'hidden'` у контейнера скроет грань).

Все размеры и цвета берутся из `tokens`: `effects.lipHeight`, `radii`, `borderWidths`,
`colors.*`.

## Движение

Значения — из `tokens.motion`:

| Событие      | Реализация                                      | Длительность |
| ------------ | ----------------------------------------------- | ------------ |
| Нажатие      | `usePressDepth`, `withTiming` + `ease`          | 100 ms       |
| Отпускание   | `usePressDepth`, `withTiming` + `ease`          | 100 ms       |
| Shake ошибки | `useShake`, `translateX(-6 → 6 → -4 → 4 → 0)`   | 300 ms       |
| Pop-in       | `usePopIn`, 0.85 → 1.03 → 1.0, overshoot-кривая | 250 ms       |
| Заполнение   | `useProgressValue`, spring-кривая               | 400 ms       |
| Spinner      | `useSpin`, линейное вращение 360°               | 800 ms       |
| Skeleton     | `usePulse`, opacity 1 → 0.5 → 1                 | 1000 ms      |

`useReducedMotion()` учитывается: нажатие становится мгновенным, shake отключается,
pop-in показывается сразу в масштабе 1.

## Примеры

```tsx
import {
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  IconButton,
  SafeAreaWrapper,
  Text,
  TextInput,
  VStack,
} from '@/shared/ui';

<Button onPress={submit}>Продолжить</Button>
<Button variant="secondary" loading={isSubmitting}>Сохранить</Button>
<Button variant="danger" disabled>Удалить</Button>
<Button variant="ghost" fullWidth>Отмена</Button>

<TextInput
  placeholder="Введите почту"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
  error={errors.email?.message}
  shakeOnError
/>

<IconButton
  accessibilityLabel="Закрыть"
  icon={({ color }) => <CloseIcon color={color} />}
  onPress={close}
/>

<Card onPress={select} selected={isSelected} badge={index + 1}>
  <Text variant="title">Вариант ответа</Text>
</Card>

<Card variant="info">
  <Text variant="body">Информационная карточка без onPress</Text>
</Card>

<SafeAreaWrapper background="bgCanvas">
  <VStack flex={1} gap="lg" padding="lg">
    <Text variant="h1" font="nunito">Добро пожаловать</Text>
    <Divider />
    <Box background="bgElevated" radius="lg" padding="lg" borderWidth="default">
      <HStack gap="sm" align="center" justify="between">
        <Icon
          name={{ ios: 'house.fill', android: 'home', web: 'home' }}
          size="lg"
          color="streak.base"
        />
        <Text variant="label">Серия</Text>
      </HStack>
    </Box>
  </VStack>
</SafeAreaWrapper>
```

### Композиция и типографика

- `Box` (алиас `Container`) принимает размеры, `padding*`/`margin*` только из `spacing`,
  `radius` из `radii`, `borderWidth` из `borderWidths`, фон/рамку из `colors`.
- `Stack` задаёт направление, `gap` из `spacing`, выравнивание (`align`) и распределение
  свободного места (`justify`, `flex`); `VStack` / `HStack` фиксируют направление.
- `SafeAreaWrapper` учитывает вырезы/status bar/home indicator на iOS, системные панели
  Android и safe-area на web; `SafeAreaProvider` уже монтируется Expo Router.
- `Divider` по умолчанию горизонтальный, цвет `borderDefault`, толщина из `borderWidths`.
- `Text`: `h1 → display`, `h2 → heading`, `h3 → title`, `label → bodySmall`; базовые
  `body`, `caption`, `button` и остальные токены сохранены. `font` выбирает
  `Nunito`/`Rubik` из `typography.families`.
- `Icon` — обёртка над уже установленным `expo-symbols`; `size` из `iconSizes`,
  цвет из `tone` или токена. Имя может быть платформенной картой
  `{ ios, android, web }`.

### Навигация

`AppBar` (`Header`) и `Tabs` — компоненты представления без зависимостей от
роутера: навигация приходит типизированными колбэками (`onBackPress`,
`onValueChange`).

```tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AppBar, Icon, IconButton, TabItem, Tabs } from '@/shared/ui';

type Section = 'words' | 'grammar' | 'review';

const sections: readonly TabItem<Section>[] = [
  { value: 'words', label: 'Слова' },
  { value: 'grammar', label: 'Грамматика' },
  { value: 'review', label: 'Повторение' },
];

function LessonNavigation() {
  const router = useRouter();
  const [section, setSection] = useState<Section>('words');

  return (
    <>
      <AppBar
        title="Урок"
        onBackPress={() => router.back()}
        actions={
          <IconButton
            accessibilityLabel="Настройки"
            onPress={() => router.push('/auth/login')}
            icon={({ color }) => (
              <Icon name={{ ios: 'gear', android: 'settings', web: 'settings' }} color={color} />
            )}
          />
        }
      />
      <Tabs tabs={sections} value={section} onValueChange={setSection} />
    </>
  );
}
```

`AppBar` выравнивает заголовок по центру независимо от ширины кнопки возврата и
слота действий (`align="leading"` включает левое выравнивание). Цвет фона и
нижней границы, размеры и отступы берутся из токенов; `background`,
`borderColor`, `showBorder` позволяют переопределить их тоже только токенами.

По умолчанию `AppBar` сам учитывает safe-area (`edges={['top', 'left', 'right']}`).
Если экран уже обёрнут в `SafeAreaWrapper`, передайте `safeArea={false}`, чтобы
не удвоить верхний отступ. `backIcon` принимает такую же функцию рендера, как
`IconButton.icon`; без `onBackPress` кнопка возврата не рендерится.

`Tabs` работает в controlled (`value` + `onValueChange`) и uncontrolled
(`defaultValue`) режимах. Активная вкладка получает цвет из `accentColor`
(по умолчанию `secondary.base`) и нижний индикатор: его ширина измеряется через
`onLayout`, а движение идёт через общий `motion.spring` токен с уважением к
`useReducedMotion`. Текст использует токен `typography.variants.tab`: uppercase,
weight 800, tracking 0.05em.

**Совместимость с навигацией проекта.** `AppBar` / `Tabs` не импортируют
`expo-router` и не заменяют навигаторы: их можно рендерить внутри экранов или
передать как `header: () => <AppBar ... />` в `Stack.Screen`. Если шапка
рендерится внутри экрана, собственную шапку роутера нужно отключить через
`headerShown: false`. `Tabs` — это переключатель подразделов внутри экрана, а
не нижняя навигация (`Tabs` / `NativeTabs` из expo-router). Слой
`providers/NavigationThemeProvider` уже синхронизирует `DefaultTheme` /
`DarkTheme` expo-router с теми же токенами, поэтому цвета шапки и System UI не
конфликтуют. Expo Router монтирует `SafeAreaProvider` (через навигационные
контейнеры), так что safe-area в `AppBar` работает без дополнительных провайдеров.

Провайдер темы обязателен: компоненты используют `useTheme()` из `shared/lib/theme`.
`src/providers/AppProviders.tsx` подключён в корневом `app/_layout.tsx` и синхронизирует
навигационную тему с токенами.

## TextInput

- утопленный фон `bgSurface`, рамка `2px` из `borderWidths.default`;
- фокус — `secondary.base`, ошибка — `danger.base` на фоне `danger.tint`;
- `error` содержит сообщение и включает состояние ошибки, `shakeKey` позволяет
  повторить shake для того же сообщения;
- `showPasswordToggle` добавляет встроенную кнопку видимости пароля;
- поддерживаются controlled (`value` + `onChangeText`) и uncontrolled (`defaultValue`) ввод;
- строка ошибки занимает заранее зарезервированную строку — появление ошибки не двигает соседние поля.

## Интерактивные контролы

Все новые контролы используют токены `components.control` (размеры), `tokens.motion`
(анимации), `Pressable3D` (нажатие/hover/focus-ring) и общие хелперы `shared/lib/a11y`.
Каждый controlled-компонент принимает `value`, а uncontrolled — `defaultValue`; `disabled`
отключает и pressed-анимацию, и доступ к клавиатуре.

```tsx
import {
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
} from '@/shared/ui';

<Checkbox checked={agreed} onValueChange={setAgreed} label="Я согласен" />
<Switch checked={enabled} onValueChange={setEnabled} label="Уведомления" />

<RadioGroup value={plan} onValueChange={setPlan} label="Тариф">
  <Radio value="free" label="Бесплатный" />
  <Radio value="pro" label="Pro" />
</RadioGroup>

<Select
  label="Язык"
  options={[
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ]}
  value={language}
  onValueChange={setLanguage}
/>

<Slider
  label="Громкость"
  value={volume}
  min={0}
  max={100}
  step={5}
  onValueChange={setVolume}
  formatValue={(value) => `${value}%`}
/>
```

### Списки, раскрытие, загрузка и прогресс

```tsx
import {
  Accordion,
  ListItem,
  ProgressBar,
  Skeleton,
  Spinner,
} from '@/shared/ui';

<ListItem
  title="Уведомления"
  subtitle="Ежедневные напоминания"
  leftSlot={<Icon name={{ ios: 'bell.fill', android: 'bell', web: 'bell' }} />}
  rightSlot={<Switch checked={enabled} onValueChange={setEnabled} />}
/>

<Accordion title="Правило" defaultExpanded>
  <Text variant="bodySmall">Развёрнутый контент с вложенными компонентами.</Text>
</Accordion>

<ProgressBar value={7} max={10} />
<Skeleton shape="line" width="70%" />
<Skeleton shape="circle" />
<Spinner size="sm" />
```

- `Card`: `info` — статичная карточка, `choice` — карточка выбора (`onPress` задаёт
  режим автоматически). Состояния `selected`, `status="correct" | "wrong"` меняют
  только цвета; геометрия (2px рамка, 4px грань, 16px радиус) постоянна.
  `badge` рисует 28×28 индикатор номера/горячей клавиши.
- `ListItem`: левый/правый слоты принимают любые узлы, включая иконки и контролы.
  Без `onPress` строка остаётся `View`, поэтому встроенные кнопки не вложены друг
  в друга; с `onPress` строка становится `Pressable3D`.
- `Accordion`: controlled (`expanded`) или uncontrolled (`defaultExpanded`).
  Высота измеряется через `onLayout` и анимируется общим `useProgressValue`,
  поэтому вложенный контент и вложенные аккордеоны не обрезаются.
- `Spinner` / `Skeleton`: используют только токены темы и общие motion-хуки;
  `Button` в состоянии `loading` уже переиспользует `Spinner`.
- `ProgressBar`: `value` ограничен `min..max` (по умолчанию 0..100), заполнение
  анимируется пружинной кривой, блик берётся из `progressHighlight`.

### Клавиатура

| Компонент             | Клавиши                                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Checkbox` / `Switch` | `Enter` — Pressable, `Space` — `useSpaceActivation`                                                                                                             |
| `Radio`               | `Enter` / `Space` — выбор; `←/↑` и `→/↓` внутри `RadioGroup` — предыдущий/следующий включённый                                                                  |
| `Select`              | закрыт: `Space` / `Enter` / стрелки — открыть; открыт: стрелки — активная опция, `Home`/`End` — первая/последняя, `Enter` / `Space` — выбор, `Escape` — закрыть |
| `Tabs`                | `Enter` — выбор; `Space` — выбор; `←/→` — предыдущая/следующая вкладка, `Home`/`End` — первая/последующая                                                       |
| `Slider`              | `←/↓` −step, `→/↑` +step, `PageUp`/`PageDown` ±10·step, `Home`/`End` — min/max                                                                                  |

`RadioGroup` хранит последнюю активную опцию, поэтому повторные нажатия стрелки
продолжают движение от неё, даже когда DOM-фокус остаётся на исходном элементе.
`Select` намеренно удерживает фокус на триггере, пока список открыт: опции получают
`accessibilityRole="option"`, но не перехватывают Tab. Клик вне списка закрывает его
через прозрачный слой.

### Доступность

- Роли: `checkbox`, `radio` + `radiogroup`, `switch`, `combobox` + `option`, `slider`,
  `tab` + `tablist` и `header` для `AppBar`.
- Состояния: `checked`, `disabled`, `expanded` передаются через `accessibilityState`;
  `Select` и `Slider` дополнительно передают `accessibilityValue`.
- Текстовая метка `label` становится доступным именем; для иконок используйте
  `accessibilityLabel`. Все контролы имеют видимый focus-ring и цель касания ≥ 44px.
- react-native-web сам синтезирует `onPress` на `Enter` для любых ролей, а на `Space` —
  только для `button`/`menuitem`. Поэтому `checkbox`/`radio`/`switch`/`combobox`
  обрабатывают `Space` явно через `useSpaceActivation`, не дублируя `Enter`.
- На нативных платформах `Slider` дополнительно регистрирует accessibility actions
  `increment` / `decrement`; `step` используется и для них, и для клавиатуры.
- `useReducedMotion()` уважается всеми анимациями: пружина и fill переключаются
  без движения, pop-in показывается сразу.

## Правила для будущих компонентов

1. Любая объёмная поверхность — через `Pressable3D` / `TactileSurface`, не через
   `borderBottomWidth`, `elevation` или размытые тени.
2. Цвета — только из `tokens.colors`; hex-литералы в компонентах запрещены.
3. Размеры — только из `tokens.spacing / radii / borderWidths / components`.
4. Стили — через `createStyles(tokens)`; динамические геометрии мемоизируются
   вне JSX (массивы стилей), но не создают новые `StyleSheet.create` на каждый рендер.
5. Интерактив обязан иметь `accessibilityRole`, `accessibilityLabel` (для icon-only),
   состояния `disabled/selected/busy`, видимый focus-ring и touch-target ≥ 44px.
6. Анимации — только из `shared/lib/motion`, с уважением к reduced motion.

## Миграция интерфейса

Экраны и оболочки авторизации используют только этот кит и токены:
`widgets/AuthScreenLayout`, `screens/auth/*`, `app/index.tsx` и роуты `app/auth/*`,
`app/register.tsx`. Роуты импортируют публичный баррель `@/screens/auth`.
Легаси-обёртки `ThemedText`, `ThemedView`, `components/AuthScreenLayout`,
демо-дубль `DemoRegisterScreen` и плоская палитра `constants/theme.ts` удалены.

## Что намеренно не сделано

- Загрузка шрифтов Nunito/Rubik через `expo-font`: в репозитории нет файлов шрифтов,
  поэтому типографические токены ссылаются на имена семейств, а платформа использует
  fallback. Для точного соответствия макету нужно добавить лицензированные TTF/WOFF2
  и один раз вызвать `Font.loadAsync` в провайдере.
