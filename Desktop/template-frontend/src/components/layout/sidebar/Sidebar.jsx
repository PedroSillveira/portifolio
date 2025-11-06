import { NavLink } from 'react-router-dom';

export default function Sidebar({ menuItems = [] }) {
  return (
    <div className="sidebar bg-white border-end" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
      <div className="p-3 border-bottom">
        <h4 className="mb-0">Template</h4>
      </div>
      
      <nav className="nav flex-column p-3">
        <NavLink 
          to="/home" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}