/** A circular, icon-only control. Always give it a label for screen readers. */
export interface IconButtonProps {
  /** Icon stem from /assets/icons. */
  icon: string;
  /** Accessible name, also used as the tooltip. Required. */
  label: string;
  variant?: 'ghost' | 'solid' | 'outline' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
