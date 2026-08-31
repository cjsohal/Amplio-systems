/** Full-width closing call to action with the ripple mark bled off the top-right corner. */
export interface CTABannerProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** brand = hero gradient. ink = charcoal. sage = quiet cream-page variant. */
  tone?: 'brand' | 'ink' | 'sage';
  style?: React.CSSProperties;
}
export declare function CTABanner(props: CTABannerProps): JSX.Element;
