import Sidebar from '@/components/layout/Sidebar';
import Content from '@/components/layout/Content';
import { GridBox } from '@/components/layout/GridBox';

export default function AppLayout() {
      return (
            <GridBox dataCssColumn="48 0 auto:1fr">
                  <Sidebar />
                  <Content />
            </GridBox>
      );
}
