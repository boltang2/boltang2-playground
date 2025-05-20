import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Content from '@/components/layout/Content';
import { GridBox } from '@/components/common/boxes/GridBox';

export default function AppLayout() {
      let [selectedKey, setSelectedKey] = useState<string | null>(null);

      useEffect(() => {
            const htmlViewButtons = document.querySelectorAll(`[data-act-key="htmlViewButtons"]`);

            htmlViewButtons.forEach((node) => {
                  node.addEventListener('selected:before', async (e: any) => {
                        console.log('[BEFORE] selected:', e.detail);
                        //console.log(e.currentTarget.textContent);
                        setSelectedKey(e.currentTarget.textContent);
                  });

                  node.addEventListener('selected:after', async (e: any) => {
                        console.log('[AFTER] selected:', e.detail);
                  });
            });

            return () => {
                  htmlViewButtons.forEach((node) => {
                        node.removeEventListener('oneway:before', () => {});
                        node.removeEventListener('oneway:after', () => {});
                        node.removeEventListener('selected:before', () => {});
                        node.removeEventListener('selected:after', () => {});
                  });
            };
      }, []);

      return (
            <GridBox dataCssSize="1/1" dataCssColumn="48 0 auto:1fr">
                  <Sidebar />
                  <Content selectedKey={selectedKey} />
            </GridBox>
      );
}
