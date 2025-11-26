import './DashboardPage.css'

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-description">데이터 플랫폼 전체 현황을 확인하세요</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">🗄️</div>
          <div className="stat-content">
            <h3 className="stat-value">24</h3>
            <p className="stat-label">Active Datasources</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3 className="stat-value">12</h3>
            <p className="stat-label">Running Pipelines</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-value">156</h3>
            <p className="stat-label">Catalog Items</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-value">98.5%</h3>
            <p className="stat-label">Data Quality Score</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">5분 전</span>
            <span className="activity-text">Pipeline "Sales ETL" 실행 완료</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">15분 전</span>
            <span className="activity-text">Datasource "MySQL Production" 연결 성공</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">1시간 전</span>
            <span className="activity-text">Data Quality 검사 완료</span>
          </div>
        </div>
      </div>
    </div>
  )
}
