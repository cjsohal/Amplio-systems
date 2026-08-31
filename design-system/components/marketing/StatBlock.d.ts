/** One number in the display face with a short caption. Use only for figures you can stand behind. */
export interface StatBlockProps {
  value?: React.ReactNode;
  label?: React.ReactNode;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export declare function StatBlock(props: StatBlockProps): JSX.Element;
