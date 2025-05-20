import React from 'react';
import SvgBox from './SvgBox';

interface SearchBoxProps extends React.HTMLAttributes<HTMLDivElement> {
      searchType?: string;
      children?: React.ReactNode;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchType, children }) => {
      if (!searchType) return null;
      return (
            <div className="search-box__inner">
                  <SvgBox svgType="search-input" />
                  <input type="text" placeholder="Search..." data-css-size="1/1" />
            </div>
      );
};

export default SearchBox;
