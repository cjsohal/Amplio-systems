/** One choice from a short exclusive set. Wrap 2–4 in RadioGroup. */
export interface RadioProps {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  onChange?: (value?: string) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export interface RadioGroupProps {
  legend?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
