/** A user-facing label: filter chip, removable selection, category. */
export interface TagProps {
  children?: React.ReactNode;
  /** Renders a dismiss affordance. */
  onRemove?: () => void;
  /** Filled sage state for a chosen filter. */
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
