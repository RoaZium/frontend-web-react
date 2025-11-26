import { PageLayout, PageHeader, PageContent, GridLayout, StatCard, Card } from '@workspace/ui'
import './DashboardPage.css'

export function DashboardPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Dashboard"
        description="데이터 플랫폼 전체 현황을 확인하세요"
      />

      <PageContent>
        <GridLayout columns={4} gap="medium">
          <StatCard
            icon="🗄️"
            value="24"
            label="Active Datasources"
            trend={{ value: '+3', isPositive: true }}
          />
          <StatCard
            icon="🔄"
            value="12"
            label="Running Pipelines"
            trend={{ value: '+2', isPositive: true }}
          />
          <StatCard
            icon="📚"
            value="156"
            label="Catalog Items"
            trend={{ value: '+12', isPositive: true }}
          />
          <StatCard
            icon="✅"
            value="98.5%"
            label="Data Quality Score"
            trend={{ value: '+0.3%', isPositive: true }}
          />
        </GridLayout>

        <Card className="activity-card">
          <h2 className="section-title">Recent Activity</h2>
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
        </Card>
      </PageContent>
    </PageLayout>
  )
}
