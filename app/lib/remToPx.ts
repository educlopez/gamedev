export function remToPx(remValue: string | number): number {
  const rootFontSize =
    typeof window === "undefined"
      ? 16
      : Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize
        );

  return Number.parseFloat(String(remValue)) * rootFontSize;
}
