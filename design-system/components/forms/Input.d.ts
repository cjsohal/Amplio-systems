/**
 * Single-line text field with label, hint and error states.
 */
export interface InputProps {
  label?: string;
  /** Helper text below the field. Replaced by `error` when set. */
  hint?: string;
  /** Sets the invalid state and shows this message. */
  error?: string;
  iconLeft?: string;
  iconRight?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
export declare const fieldLabelStyle: React.CSSProperties;
export declare function fieldShellStyle(focused: boolean, invalid: boolean, disabled?: boolean): React.CSSProperties;
export declare function fieldHintStyle(invalid: boolean): React.CSSProperties;
