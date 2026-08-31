/**
 * The primary call to action. Pill-shaped, Lato bold, lifts 2px on hover.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = green fill (one per view). secondary = outlined. ghost = quiet. inverse = on green/ink. danger = destructive only. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Icon stem from /assets/icons. */
  iconLeft?: string;
  iconRight?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
