import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">Data Platform</h1>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/datasource" className="nav-link">Datasource</Link>
        <Link to="/pipeline" className="nav-link">Pipeline</Link>
        <Link to="/catalog" className="nav-link">Catalog</Link>
        <Link to="/quality" className="nav-link">Quality</Link>
      </nav>
      <div className="header-right">
        <span className="user-info">Admin</span>
      </div>
    </header>
  )
}
