import './QualityPage.css'

export function QualityPage() {
  return (
    <div className="quality-page">
      <div className="page-header">
        <h1>Data Quality</h1>
        <p className="page-description">데이터 품질을 모니터링하고 관리하세요</p>
      </div>

      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-icon">✅</div>
          <h2>Data Quality 관리</h2>
          <p>데이터 품질 규칙을 정의하고 자동으로 검증합니다.</p>
          <ul className="feature-list">
            <li>✓ 품질 규칙 정의 및 실행</li>
            <li>✓ 데이터 프로파일링</li>
            <li>✓ 이상치 탐지 및 알림</li>
            <li>✓ 품질 리포트 및 대시보드</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
