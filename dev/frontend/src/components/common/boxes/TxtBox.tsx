// TxtBox.tsx
import React from 'react';

interface TxtBoxProps {
      txtType?: string;
      children?: React.ReactNode;
}

const TxtBox: React.FC<TxtBoxProps> = ({ txtType, children }) => {
      if (!txtType) return null;
      return <span>{children}</span>;
};

export default TxtBox;
