# UI-кит: фундамент Tactile 2.5D / Juicy UI

Этот каталог содержит только **фундамент** визуальной системы. Экраны и легаси-компоненты
(`SubmitButton`, `InputField`, `ThemedText`) сюда не мигрировали.

## Слои

```
shared/config/theme      токены: палитра, типографика, радиусы, motion             (готово ранее)
shared/lib/theme         ThemeProvider + useTheme                                  (готово ранее)
shared/lib/styles        createStyles(tokens) — типизированные StyleSheet-хуки
shared/lib/motion        usePressDepth / useShake / usePopIn                       (Reanimated 4)
shared/ui/TactileLayers  единственная реализация нижней объёмной грани
shared/ui/Pressable3D    интерактивная 2.5D-поверхность (press + hover + focus)
shared/ui/TactileSurface неинтерактивная 2.5D-поверхность (статические карточки)
shared/ui/Button         первый потребитель механизма
shared/ui/IconButton     icon-only действие
shared/ui/Card           карточка, интерактивная при наличии onPress
shared/ui/Text           типографический примитив на токенах
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

| Событие      | Реализация                                             | Длительность |
| ------------ | ------------------------------------------------------ | ------------ |
| Нажатие      | `usePressDepth`, `withTiming` + `ease`                 | 100 ms       |
| Отпускание   | `usePressDepth`, spring-кривая `(0.34, 1.56, 0.64, 1)` | 250 ms       |
| Shake ошибки | `useShake`, `translateX(-6 → 6 → -4 → 4 → 0)`          | 300 ms       |
| Pop-in       | `usePopIn`, overshoot-кривая                           | 250 ms       |

`useReducedMotion()` учитывается: нажатие становится мгновенным, shake отключается,
pop-in показывается сразу в масштабе 1.

## Примеры

```tsx
import { Button, Card, IconButton, Text } from '@/shared/ui';

<Button accent="primary" onPress={submit}>Продолжить</Button>
<Button variant="outline" loading={isSubmitting}>Сохранить</Button>
<Button accent="danger" disabled>Удалить</Button>

<IconButton
  accessibilityLabel="Закрыть"
  icon={({ color }) => <CloseIcon color={color} />}
  onPress={close}
/>

<Card onPress={select} selected={isSelected}>
  <Text variant="title">Вариант ответа</Text>
</Card>
```

Провайдер темы обязателен: компоненты используют `useTheme()` из `shared/lib/theme`.
`src/providers/AppProviders.tsx` уже содержит нужный `ThemeProvider`; его подключение
к `app/_layout.tsx` — отдельный шаг интеграции.

## Правила для будущих компонентов

1. Любая объёмная поверхность — через `Pressable3D` / `TactileSurface`, не через
   `borderBottomWidth`, `elevation` или размытые тени.
2. Цвета — только из `tokens.colors`; hex-литералы в компонентах запрещены.
3. Размеры — только из `tokens.spacing / radii / borderWidths / components`.
4. Стили — через `createStyles(tokens)`, без inline-объектов в JSX.
5. Интерактив обязан иметь `accessibilityRole`, `accessibilityLabel` (для icon-only),
   состояния `disabled/selected/busy`, видимый focus-ring и touch-target ≥ 44px.
6. Анимации — только из `shared/lib/motion`, с уважением к reduced motion.

## Что намеренно не сделано

- Input, ChoiceCard, ProgressBar, FeedbackSheet, Badge — следующий этап.
- Миграция `screens/auth` и `app/index.tsx`.
- Загрузка шрифтов Nunito/Rubik через `expo-font` (типографические токены уже ссылаются
  на них; без загрузки платформа использует fallback-шрифт).
