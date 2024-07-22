import { Outlet } from 'react-router-dom';

import { MainLayout } from '~widgets/main-layout';

function RootPage() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default RootPage;
