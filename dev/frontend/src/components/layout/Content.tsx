import React from 'react';
import { GridBox } from '@/components/common/boxes/GridBox';
import Google from '@/components/layout/Google';
interface ContentProps {
      selectedKey: string | null;
}

const Content: React.FC<ContentProps> = ({ selectedKey }) => {
      let content: React.ReactNode;
      if (!selectedKey) {
            content = <div>초기 상태입니다</div>;
      } else {
            switch (selectedKey.trim()) {
                  case 'Google':
                        content = <Google />;
                        break;
                  case 'KaKao':
                        content = <div>카카오 로그인 예제입니다</div>;
                        break;
                  case 'Naver':
                        content = <div>네이버 로그인 예제입니다</div>;
                        break;
                  default:
                        content = <div>404 - 해당 내용을 찾을 수 없습니다.</div>;
            }
      }

      return (
            <GridBox id="content" dataCssRow="48 0 1:1fr">
                  {content}
            </GridBox>
      );
};

export default Content;
