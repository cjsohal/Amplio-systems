/**
 * Switches between sibling views. Underline by default; pill for compact filters.
 * @startingPoint section="Navigation" subtitle="Tabs and accordions" viewport="700x300"
 */
export interface TabItem { id: string; label: string; icon?: string }
export interface TabsProps {
  tabs?: TabItem[];
  value?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pill';
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
