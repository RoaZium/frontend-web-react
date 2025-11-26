import { PageLayout, PageHeader, PageContent, TabLayout, GridLayout, Card, Button, Table, StatCard } from '@workspace/ui'
import './PipelinePage.css'

const mockPipelines = [
  { id: 1, name: 'Sales ETL', status: 'Running', lastRun: '5분 전', duration: '2m 30s' },
  { id: 2, name: 'User Analytics', status: 'Success', lastRun: '1시간 전', duration: '5m 12s' },
  { id: 3, name: 'Inventory Sync', status: 'Failed', lastRun: '2시간 전', duration: '1m 45s' },
]

const mockSchedules = [
  { id: 1, pipeline: 'Sales ETL', schedule: 'Every 5 minutes', nextRun: '3분 후' },
  { id: 2, pipeline: 'Daily Report', schedule: 'Daily at 9:00 AM', nextRun: '내일 오전 9시' },
  { id: 3, pipeline: 'Weekly Backup', schedule: 'Every Monday', nextRun: '다음주 월요일' },
]

export function PipelinePage() {
  const pipelineColumns = [
    { key: 'name', header: 'Pipeline Name', width: '30%' },
    {
      key: 'status',
      header: 'Status',
      width: '20%',
      render: (row: typeof mockPipelines[0]) => (
        <span className={`status-badge status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      )
    },
    { key: 'lastRun', header: 'Last Run', width: '25%' },
    { key: 'duration', header: 'Duration', width: '25%' },
  ]

  const scheduleColumns = [
    { key: 'pipeline', header: 'Pipeline', width: '30%' },
    { key: 'schedule', header: 'Schedule', width: '40%' },
    { key: 'nextRun', header: 'Next Run', width: '30%' },
  ]

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="tab-content-wrapper">
          <GridLayout columns={3} gap="medium">
            <StatCard icon="🔄" value="12" label="Active Pipelines" />
            <StatCard icon="✅" value="245" label="Successful Runs" />
            <StatCard icon="❌" value="8" label="Failed Runs" />
          </GridLayout>
          <Card className="pipelines-card">
            <h3 className="section-title">Recent Runs</h3>
            <Table data={mockPipelines} columns={pipelineColumns} />
          </Card>
        </div>
      )
    },
    {
      id: 'schedules',
      label: 'Schedules',
      content: (
        <Card padding="none">
          <Table data={mockSchedules} columns={scheduleColumns} />
        </Card>
      )
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      content: (
        <Card>
          <h3 className="section-title">Pipeline Monitoring</h3>
          <p className="placeholder-text">실시간 파이프라인 모니터링 대시보드가 여기에 표시됩니다.</p>
        </Card>
      )
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Pipeline Orchestration"
        description="데이터 파이프라인을 구축하고 실행을 관리하세요"
        actions={
          <>
            <Button variant="secondary">Import Pipeline</Button>
            <Button variant="primary">Create Pipeline</Button>
          </>
        }
      />

      <PageContent>
        <TabLayout tabs={tabs} defaultTab="overview" />
      </PageContent>
    </PageLayout>
  )
}
