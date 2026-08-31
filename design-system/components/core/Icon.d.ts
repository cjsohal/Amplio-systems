/**
 * A Lucide glyph painted in currentColor via CSS mask.
 */
export interface IconProps {
  /** File stem in /assets/icons, e.g. "arrow-right". */
  name: string;
  /** Square edge in px. 16 inline · 20 in buttons · 24 default · 32–40 feature marks. */
  size?: number;
  /** Overrides currentColor. Prefer inheriting. */
  color?: string;
  strokeAlign?: boolean;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare function iconBase(): string;
