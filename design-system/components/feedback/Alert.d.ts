/**
 * Inline message about the state of the page or a form.
 */
export interface AlertProps {
  tone?: 'success' | 'warning' | 'info' | 'danger';
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
