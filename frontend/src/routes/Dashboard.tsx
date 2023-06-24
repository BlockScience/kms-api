import { SetTitle } from '@/utils'
import { Box, Stack } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import StatsGrid from '@/components/StatsGrid'
import { LogTable } from '@/components/LogTable'
import TagSpan from '@/components/InlineTag'
import TagSet from '@/components/TagSet'
import AreaChart from '@/components/AreaChart'

export default function Dashboard() {
  return (
    <div>
      <SetTitle text='Dashboard' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Dashboard</PageTitle>
        <Stack>
          <StatsGrid
            data={[
              { title: 'Tags Added', value: '17', diff: -7 },
              { title: 'Tags Removed', value: '27', diff: 14 },
              { title: 'Queries Completed', value: '31', diff: 12 },
              { title: 'Proposals Submitted', value: '3', diff: 1 },
              { title: 'Proposals Resolved', value: '3', diff: 1 },
              { title: 'Objects Added', value: '149', diff: 29 },
              { title: 'Objects Updated', value: '1520', diff: -11 },
            ]}
          />
          <TagSet
            label='Tags in knowledgebase'
            data={[
              'foo',
              'bar',
              'baz',
              'foo',
              'baaar',
              'barsz',
              'foo',
              'baadr',
              'bafsz',
              'fooasf',
              'bar',
              'baz',
            ]}
          />
          <TagSet label='Tags in schema' data={['foo', 'bar', 'baz']} />
          <TagSet label='Tags in schema & knowledgebase' data={['foo', 'bar', 'baz']} />
          <AreaChart />
          <LogTable
            data={[
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce71',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce72',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc13',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8277e0910d750195b448797616e091ad4',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce75',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc16',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8277e0910d750195b448797616e091ad7',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce78',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc19',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8277e0910d750195b448797616e091ad11',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce712',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc113',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8277e0910d750195b448797616e091ad14',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce715',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc116',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8277e0910d750195b448797616e091ad17',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>kms</TagSpan>&nbsp;
                    <TagSpan color='red'>cadcad</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: '8fa14cdd754f91cc6554c9e71929cce718',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>fluff</TagSpan>&nbsp;
                    <TagSpan color='green'>rock</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectRID: 'd86ec7ac67cf45f6205a8ed9080e6fc119',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <TagSpan color='green'>tree</TagSpan>&nbsp;
                    <TagSpan color='red'>stick</TagSpan>
                  </div>
                ),
                time: 'yesterday',
              },
            ]}
          />
        </Stack>
      </Box>
    </div>
  )
}
