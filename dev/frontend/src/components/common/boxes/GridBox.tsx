// src/components/layout/GridBox.tsx
import React from 'react';

interface GridBoxProps {
      id?: string;
      className?: string;
      dataCssSize?: string; // ex: "1/1"
      dataCssRow?: string; // ex: "48 0 auto:1fr"
      dataCssColumn?: string; // ex: "48 0 auto:1fr"
      dataActTarget?: string;
      children?: React.ReactNode;
}

export const GridBox: React.FC<GridBoxProps> = ({ id, className, dataCssSize, dataCssRow, dataCssColumn, dataActTarget, children, ...rest }) => {
      const css: React.CSSProperties = {};

      if (dataCssSize) {
            const [width, height] = dataCssSize.split('/');
            if (width.length) css.width = Number(width) * 100 + '%';
            if (height.length) css.height = Number(height) * 100 + '%';
      }

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

      // 조건부 attribute 포함용 객체 생성
      const conditionalAttrs = {
            ...(dataActTarget && { 'data-act-key': dataActTarget }),
      };

      return (
            <div id={id} className={className} {...conditionalAttrs} style={{ display: 'grid', ...css }}>
                  {children}
            </div>
      );
};
