export const SOURCE_ZOOM_MIN = 1;
export const SOURCE_ZOOM_MAX = 2.5;
export const SOURCE_ZOOM_STEP = 0.25;

export function clampSourceZoom(value: number) {
  return Math.min(SOURCE_ZOOM_MAX, Math.max(SOURCE_ZOOM_MIN, Number(value.toFixed(2))));
}

export function stepSourceZoom(value: number, direction: -1 | 1) {
  return clampSourceZoom(value + direction * SOURCE_ZOOM_STEP);
}

export function pinchSourceZoom(startZoom: number, startDistance: number, currentDistance: number) {
  if (startDistance <= 0 || currentDistance <= 0) return clampSourceZoom(startZoom);
  return clampSourceZoom(startZoom * (currentDistance / startDistance));
}

export function sourcePageViewportClass(sourceZoom: number) {
  return sourceZoom > SOURCE_ZOOM_MIN ? "source-page-viewport is-zoomed" : "source-page-viewport";
}
