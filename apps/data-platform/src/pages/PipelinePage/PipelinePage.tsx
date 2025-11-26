import './PipelinePage.css'

export function PipelinePage() {
  return (
    <div className="pipeline-page">
      <div className="page-header">
        <h1>Pipeline Orchestration</h1>
        <p className="page-description">데이터 파이프라인을 구축하고 실행을 관리하세요</p>
      </div>

      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-icon">🔄</div>
          <h2>Pipeline 관리</h2>
          <p>ETL/ELT 파이프라인을 설계하고 스케줄링합니다.</p>
          <ul className="feature-list">
            <li>✓ 비주얼 파이프라인 빌더</li>
            <li>✓ 스케줄링 및 자동 실행</li>
            <li>✓ 실행 히스토리 및 로그</li>
            <li>✓ 오류 알림 및 재시도</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
