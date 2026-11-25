import { clamp } from '../measure';

function decimalPlaces(step: number): number {
  const text = String(step);

  if (!text.includes('.')) {
    return 0;
  }

  return text.split('.')[1]?.length ?? 0;
}

/** Clamps and snaps a raw pointer/keyboard value to the configured step grid. */
export function snapToStep(value: number, min: number, max: number, step: number): number {
  const safeStep = step > 0 ? step : 1;
  const raw = min + Math.round((value - min) / safeStep) * safeStep;
  const clamped = clamp(raw, min, max);

  return Number(clamped.toFixed(decimalPlaces(safeStep)));
}

export function toRatio(value: number, min: number, max: number): number {
  if (max === min) {
    return 0;
  }

  return clamp((value - min) / (max - min), 0, 1);
}

export function fromRatio(ratio: number, min: number, max: number): number {
  return min + clamp(ratio, 0, 1) * (max - min);
}
