/**
 * The system's container. White on cream by default, 16px radius, warm soft shadow, no border.
 */
export interface CardProps {
  children?: React.ReactNode;
  /** raised = default white + shadow. outlined = dense lists. sage = quiet grouping. ink/brand = inverted feature panels. */
  variant?: 'raised' | 'outlined' | 'sage' | 'ink' | 'brand';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds the 2px hover lift. Use only when the whole card is clickable. */
  interactive?: boolean;
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
