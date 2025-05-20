import React, { useEffect } from 'react';
import { GridBox } from '@/components/common/boxes/GridBox';
import CustomBox from '../common/boxes/CustomBox';

const Sidebar: React.FC = () => {
      useEffect(() => {
            const sidebarButtons = document.querySelectorAll('#sidebar__main [data-act-key="sidebarButtons"]');

            sidebarButtons.forEach((node) => {
                  node.addEventListener('selected:before', (e: any) => {
                        console.log('[BEFORE] selected:', e.detail);
                  });

                  node.addEventListener('selected:after', (e: any) => {
                        console.log('[AFTER] selected:', e.detail);
                  });
            });

            return () => {
                  sidebarButtons.forEach((node) => {
                        node.removeEventListener('oneway:before', () => {});
                        node.removeEventListener('oneway:after', () => {});
                        node.removeEventListener('selected:before', () => {});
                        node.removeEventListener('selected:after', () => {});
                  });
            };
      }, []);

      return (
            <GridBox id="sidebar" dataCssColumn="48 0 1:0.02:auto:0.02">
                  <GridBox id="sidebar__main" dataCssRow="48 0 2:1:1:1fr">
                        <CustomBox className=""></CustomBox>
                        <CustomBox
                              id="back-end"
                              className="li"
                              dataSvgType="square-letter-b-outline"
                              dataActEvent="click"
                              dataActHandler="oneway(on)/selected(active)"
                              dataActTarget="sidebarButtons"
                        ></CustomBox>
                        <CustomBox
                              id="front-end"
                              className="li"
                              dataSvgType="square-letter-f-outline"
                              dataActEvent="click"
                              dataActHandler="oneway(on)/selected(active)"
                              dataActTarget="sidebarButtons"
                        ></CustomBox>
                        <CustomBox className=""></CustomBox>
                  </GridBox>
                  <GridBox className="sidebar__border"></GridBox>
                  <GridBox id="sidebar__sub" dataActTarget="sidebarButtons" dataCssRow="48 0 1:1:1fr">
                        <GridBox id="sidebar__sub__header" dataCssColumn="48 0 1fr:1">
                              <CustomBox id="sidebar__sub__title" dataTxtType="" dataAlignType="centerleft"></CustomBox>
                              <CustomBox
                                    dataSvgType="arrow-big-left-outline"
                                    dataActEvent="click"
                                    dataActHandler="oneway(off)"
                                    dataActTarget="sidebarButtons"
                              ></CustomBox>
                        </GridBox>
                        <CustomBox dataSearchType="base"></CustomBox>
                        <GridBox id="sidebar__sub__body">
                              <GridBox id="ul__back-end" className="ul__sidebar-sub" dataCssSize="1/1" dataCssRow="48 0 auto:auto:1fr">
                                    <GridBox dataCssRow="48 0 1:1fr">
                                          <GridBox className="li__header__sidebar-sub" dataCssColumn="48 0 1:1fr">
                                                <CustomBox dataSvgType="border-corners"></CustomBox>
                                                <CustomBox
                                                      dataAlignType="centerleft"
                                                      dataTxtType="base"
                                                      dataActEvent="click"
                                                      dataActHandler="toggle(on:off)"
                                                      dataActTarget="li__login"
                                                >
                                                      Login
                                                </CustomBox>
                                          </GridBox>
                                          <CustomBox dataActTarget="li__login" className="li__body__sidebar-sub">
                                                <GridBox className="li__sidebar-sub" dataCssColumn="48 0 0.75:1:1fr" dataActTarget="htmlViewButtons">
                                                      <CustomBox dataDummyType="base"></CustomBox>
                                                      <CustomBox dataSvgType="corner-down-right"></CustomBox>
                                                      <CustomBox
                                                            dataAlignType="centerleft"
                                                            dataTxtType="base"
                                                            dataActEvent="click"
                                                            dataActHandler="selected(open)"
                                                            dataActTarget="htmlViewButtons"
                                                      >
                                                            Google
                                                      </CustomBox>
                                                </GridBox>
                                                <GridBox className="li__sidebar-sub" dataCssColumn="48 0 0.75:1:1fr" dataActTarget="htmlViewButtons">
                                                      <CustomBox dataDummyType="base"></CustomBox>
                                                      <CustomBox dataSvgType="corner-down-right"></CustomBox>
                                                      <CustomBox
                                                            dataAlignType="centerleft"
                                                            dataTxtType="base"
                                                            dataActEvent="click"
                                                            dataActHandler="selected(open)"
                                                            dataActTarget="htmlViewButtons"
                                                      >
                                                            Naver
                                                      </CustomBox>
                                                </GridBox>
                                                <GridBox className="li__sidebar-sub" dataCssColumn="48 0 0.75:1:1fr" dataActTarget="htmlViewButtons">
                                                      <CustomBox dataDummyType="base"></CustomBox>
                                                      <CustomBox dataSvgType="corner-down-right"></CustomBox>
                                                      <CustomBox
                                                            dataAlignType="centerleft"
                                                            dataTxtType="base"
                                                            dataActEvent="click"
                                                            dataActHandler="selected(open)"
                                                            dataActTarget="htmlViewButtons"
                                                      >
                                                            KaKao
                                                      </CustomBox>
                                                </GridBox>
                                          </CustomBox>
                                    </GridBox>
                                    <GridBox dataCssRow="48 0 1:1fr">
                                          <GridBox className="li__header__sidebar-sub" dataCssColumn="48 0 1:1fr">
                                                <CustomBox dataSvgType="border-corners"></CustomBox>
                                                <CustomBox
                                                      dataAlignType="centerleft"
                                                      dataTxtType="base"
                                                      dataActEvent="click"
                                                      dataActHandler="toggle(on:off)"
                                                      dataActTarget="li__excel"
                                                >
                                                      Excel
                                                </CustomBox>
                                          </GridBox>
                                    </GridBox>
                                    <CustomBox dataDummyType="base"></CustomBox>
                              </GridBox>
                        </GridBox>
                  </GridBox>
                  <GridBox className="sidebar__border"></GridBox>
            </GridBox>
      );
};

export default Sidebar;
