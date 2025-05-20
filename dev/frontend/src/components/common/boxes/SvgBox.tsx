// SvgBox.tsx
import React from 'react';
import { svgMap } from '../maps/SvgMap';

interface SvgBoxProps {
      svgType?: string;
}

const SvgBox: React.FC<SvgBoxProps> = ({ svgType }) => {
      if (!svgType) return null;
      return <>{svgMap[svgType] || null}</>;
};

export default SvgBox;
