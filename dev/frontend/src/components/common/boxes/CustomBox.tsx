// CustomBox.tsx
import React, { useRef } from 'react';
import clsx from 'clsx';
import TxtBox from './TxtBox';
import useActionBox from './ActBox'; // hook으로 사용
import SvgBox from './SvgBox';
import SearchBox from './SearchBox';

interface CustomBoxProps extends React.HTMLAttributes<HTMLDivElement> {
      id?: string;
      className?: string;
      children?: React.ReactNode;
      dataAlignType?: string;
      dataDummyType?: string;
      dataTxtType?: string;
      dataSvgType?: string;
      dataSearchType?: string;
      dataActEvent?: string;
      dataActHandler?: string;
      dataActTarget?: string;
}

const CustomBox: React.FC<CustomBoxProps> = ({
      id,
      className,
      children,
      dataAlignType: alignType,
      dataDummyType: dummyType,
      dataTxtType: txtType,
      dataSvgType: svgType,
      dataSearchType: searchType,
      dataActEvent: actEvent,
      dataActHandler: actHandler,
      dataActTarget: actTarget,
      ...rest
}) => {
      const classes = clsx(
            dummyType && 'dummy-box',
            txtType && 'txt-box',
            svgType && 'svg-box',
            searchType && 'search-box',
            actHandler && 'act-box',
            className
      );
      const ref = useRef<HTMLDivElement>(null);
      useActionBox(ref, actEvent, actHandler, actTarget);
      // 조건부 attribute 포함용 객체 생성
      const conditionalAttrs = {
            ...(alignType && { 'data-css-align': alignType }),
            ...(actTarget && { 'data-act-key': actTarget }),
      };
      return (
            <div id={id} className={classes} ref={ref} {...conditionalAttrs} {...rest}>
                  <SearchBox searchType={searchType}></SearchBox>
                  <SvgBox svgType={svgType} />
                  <TxtBox txtType={txtType}>{children}</TxtBox>
                  {!searchType && !svgType && !txtType && children}
            </div>
      );
};
export default CustomBox;
