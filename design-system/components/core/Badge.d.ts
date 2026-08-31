/** A small status pill. Read-only — use Tag for removable, user-set labels. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'brand' | 'neutral' | 'success' | 'warning' | 'info' | 'danger' | 'solid';
  /** Icon stem from /assets/icons, rendered at 14px. */
  icon?: string;
  /** Small leading dot instead of an icon. */
  dot?: boolean;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
