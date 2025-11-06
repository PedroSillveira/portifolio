import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ menuItems = [] }) {
  return (
    <div className="d-flex">
      <Sidebar menuItems={menuItems} />
      
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <Header />
        
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}