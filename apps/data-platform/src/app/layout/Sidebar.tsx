import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/datasource"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          🗄️ Datasource
        </NavLink>
        <NavLink
          to="/pipeline"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          🔄 Pipeline
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          📚 Catalog
        </NavLink>
        <NavLink
          to="/quality"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ✅ Quality
        </NavLink>
      </nav>
    </aside>
  )
}
