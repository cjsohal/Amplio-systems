/** Icon-led card for a service, benefit or step. Icon sits in a 52px leaf-cornered sage tile. */
export interface FeatureCardProps {
  /** Icon stem from /assets/icons. */
  icon?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Makes the whole card a link and enables the hover lift. */
  href?: string;
  /** Makes the whole card clickable (in-app navigation) and enables the hover lift. */
  onClick?: () => void;
  tone?: 'raised' | 'outlined' | 'sage' | 'ink' | 'brand';
  style?: React.CSSProperties;
}
export declare function FeatureCard(props: FeatureCardProps): JSX.Element;
