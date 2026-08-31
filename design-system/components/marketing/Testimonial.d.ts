/** Client quote in the display face, with a rule-and-attribution caption. No avatar imagery. */
export interface TestimonialProps {
  quote?: React.ReactNode;
  name?: string;
  /** Role and business, e.g. "Chiropractor, Leeds". */
  role?: string;
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}
export declare function Testimonial(props: TestimonialProps): JSX.Element;
