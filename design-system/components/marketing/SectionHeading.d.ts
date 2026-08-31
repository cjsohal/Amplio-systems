/** Eyebrow + display title + supporting paragraph — opens every marketing section. */
export interface SectionHeadingProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  /** Heading level for document outline. Only one h1 per page. */
  level?: 1 | 2 | 3;
  maxWidth?: number;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
