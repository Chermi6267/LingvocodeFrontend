import { Stack, type VStackProps } from '../Stack';

/** Vertical stack: a `Stack` with a fixed direction. */
export function VStack(props: VStackProps) {
  return <Stack {...props} direction="vertical" />;
}
