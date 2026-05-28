declare module '*.css' {
  const style: { [className: string]: string }
  export default style
}
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}