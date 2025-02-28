declare module 'react-highlight' {
  import React from 'react';
  
  interface HighlightProps {
    className?: string;
    children: string;
  }
  
  const Highlight: React.FC<HighlightProps>;
  
  export default Highlight;
}
