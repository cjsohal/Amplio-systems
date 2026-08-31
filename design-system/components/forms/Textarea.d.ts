/** Multi-line text field. Same shell as Input, vertically resizable. */
export interface TextareaProps {
  label?: string; hint?: string; error?: string; rows?: number;
  disabled?: boolean; required?: boolean;
  value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string; id?: string; style?: React.CSSProperties;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
