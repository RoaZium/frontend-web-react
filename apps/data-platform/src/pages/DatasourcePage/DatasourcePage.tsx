import { useState } from 'react'
import { PageLayout, PageHeader, PageContent, SplitLayout, Card, Button, Table } from '@workspace/ui'
import './DatasourcePage.css'

const mockDatasources = [
  { id: 1, name: 'MySQL Production', type: 'MySQL', status: 'Connected', lastSync: '2분 전' },
  { id: 2, name: 'PostgreSQL Analytics', type: 'PostgreSQL', status: 'Connected', lastSync: '5분 전' },
  { id: 3, name: 'MongoDB Logs', type: 'MongoDB', status: 'Disconnected', lastSync: '1시간 전' },
  { id: 4, name: 'S3 Data Lake', type: 'S3', status: 'Connected', lastSync: '10분 전' },
]

export function DatasourcePage() {
  const [selected, setSelected] = useState(mockDatasources[0])

  const columns = [
    { key: 'name', header: 'Name', width: '40%' },
    { key: 'type', header: 'Type', width: '20%' },
    {
      key: 'status',
      header: 'Status',
      width: '20%',
      render: (row: typeof mockDatasources[0]) => (
        <span className={`status-badge status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      )
    },
    { key: 'lastSync', header: 'Last Sync', width: '20%' },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Datasource Management"
        description="데이터 소스를 관리하고 연결 상태를 모니터링하세요"
        actions={
          <>
            <Button variant="secondary" size="medium">Import</Button>
            <Button variant="primary" size="medium">Add Datasource</Button>
          </>
        }
      />

      <PageContent>
        <SplitLayout
          leftWidth="40%"
          left={
            <Card padding="none">
              <Table
                data={mockDatasources}
                columns={columns}
                onRowClick={setSelected}
              />
            </Card>
          }
          right={
            <Card>
              <h2 className="detail-title">{selected.name}</h2>
              <div className="detail-section">
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selected.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge status-${selected.status.toLowerCase()}`}>
                    {selected.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Sync:</span>
                  <span className="detail-value">{selected.lastSync}</span>
                </div>
              </div>

              <div className="detail-actions">
                <Button variant="primary">Test Connection</Button>
                <Button variant="secondary">View Schema</Button>
                <Button variant="secondary">Edit Settings</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </Card>
          }
        />
      </PageContent>
    </PageLayout>
  )
}
