import './CatalogPage.css'

export function CatalogPage() {
  return (
    <div className="catalog-page">
      <div className="page-header">
        <h1>Data Catalog</h1>
        <p className="page-description">데이터 자산을 검색하고 메타데이터를 관리하세요</p>
      </div>

      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-icon">📚</div>
          <h2>Data Catalog</h2>
          <p>조직의 모든 데이터 자산을 한 곳에서 관리합니다.</p>
          <ul className="feature-list">
            <li>✓ 데이터 검색 및 디스커버리</li>
            <li>✓ 메타데이터 및 스키마 정보</li>
            <li>✓ 데이터 계보 추적</li>
            <li>✓ 태그 및 분류 관리</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
