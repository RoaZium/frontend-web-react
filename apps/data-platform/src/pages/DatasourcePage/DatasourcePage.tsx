import './DatasourcePage.css'

export function DatasourcePage() {
  return (
    <div className="datasource-page">
      <div className="page-header">
        <h1>Datasource Management</h1>
        <p className="page-description">데이터 소스를 관리하고 연결 상태를 모니터링하세요</p>
      </div>

      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-icon">🗄️</div>
          <h2>Datasource 관리</h2>
          <p>데이터베이스, API, 파일 등 다양한 데이터 소스를 연결하고 관리합니다.</p>
          <ul className="feature-list">
            <li>✓ 데이터소스 연결 및 테스트</li>
            <li>✓ 연결 상태 실시간 모니터링</li>
            <li>✓ 스키마 탐색 및 메타데이터 수집</li>
            <li>✓ 권한 및 보안 설정</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
