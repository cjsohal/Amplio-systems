/**
 * The Amplio Systems logo, in its approved variations only.
 */
export interface LogoProps {
  /** Which approved file to render. */
  variant?: 'lockup-colour' | 'lockup-light' | 'lockup-ink' | 'mark-colour' | 'mark-light' | 'mark-ink' | 'mark-cream' | 'wordmark' | 'atlas-colour' | 'atlas-light' | 'atlas-ink';
  /** Rendered height in px. Full lockup must never fall below ~28px (120px wide); mark below 32px. */
  height?: number;
  href?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
export declare function assetBase(): string;
