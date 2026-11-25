import { Stack, type HStackProps } from '../Stack';

/** Horizontal stack: a `Stack` with a fixed direction. */
export function HStack(props: HStackProps) {
  return <Stack {...props} direction="horizontal" />;
}
