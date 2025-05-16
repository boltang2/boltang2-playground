// src/components/layout/GridBox.tsx
import React from 'react';

interface GridBoxProps {
      dataCssRow?: string; // ex: "48 0 auto:1fr"
      dataCssColumn?: string; // ex: "48 0 auto:1fr"
      children?: React.ReactNode;
}

export const GridBox: React.FC<GridBoxProps> = ({ dataCssRow, dataCssColumn, children }) => {
      const css: React.CSSProperties = {};

      if (dataCssRow) {
            const [size, gap, template] = dataCssRow.split(' ');
            if (template) {
                  css.gridTemplateRows = template.split(':').reduce((acc, u) => {
                        if (u.includes('fr') || u.includes('auto')) acc += `${u} `;
                        else if (u.includes('rep')) {
                              const [_, count, multiplier] = u.split('/');
                              acc += `repeat(${count}, ${Number(size) * Number(multiplier)}px) `;
                        } else acc += `${Number(size) * Number(u)}px `;
                        return acc;
                  }, '');
            }
            if (gap) css.rowGap = `${gap}px`;
      }

      if (dataCssColumn) {
            const [size, gap, template] = dataCssColumn.split(' ');
            if (template) {
                  css.gridTemplateColumns = template.split(':').reduce((acc, u) => {
                        if (u.includes('fr') || u.includes('auto')) acc += `${u} `;
                        else if (u.includes('rep')) {
                              const [_, count, multiplier] = u.split('/');
                              acc += `repeat(${count}, ${Number(size) * Number(multiplier)}px) `;
                        } else acc += `${Number(size) * Number(u)}px `;
                        return acc;
                  }, '');
            }
            if (gap) css.columnGap = `${gap}px`;
      }

      return <div style={{ display: 'grid', ...css }}>{children}</div>;
};
