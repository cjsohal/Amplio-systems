/** Square 20px checkbox, fills Amplio Green when checked. */
export interface CheckboxProps {
  label?: React.ReactNode;
  /** Optional second line of explanation. */
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
