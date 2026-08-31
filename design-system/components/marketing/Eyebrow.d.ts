/**
 * Wide-tracked uppercase label that sits above a heading — the brand's signature type device.
 */
export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: 'brand' | 'muted' | 'inverse';
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
