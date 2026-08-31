/** Progressive disclosure list — the FAQ pattern. Hairline rules, no card chrome. */
export interface AccordionItem { id: string; question: string; answer: React.ReactNode }
export interface AccordionProps {
  items?: AccordionItem[];
  /** Allow more than one panel open at a time. */
  allowMultiple?: boolean;
  defaultOpen?: string[];
  style?: React.CSSProperties;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
