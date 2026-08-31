/** Native select with brand chrome and a chevron affordance. */
export interface SelectOption { value: string; label: string }
export interface SelectProps {
  label?: string; hint?: string; error?: string;
  options?: (SelectOption | string)[];
  value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean; required?: boolean; placeholder?: string;
  id?: string; style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
