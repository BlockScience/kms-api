import { SetTitle } from '@/utilities/metadata';
import { Box, Button, Stack } from '@mantine/core';
import { PageTitle } from '@/components/typography';
import StatsGrid from '@/components/statsGrid';
import { LogTable } from '@/components/logTable';
import InlineTag from '@/components/inlineTag';
import TagSet from '@/components/TagSet';
import AreaChart from '@/components/AreaChart';

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
          <TagSet
            label='Tags in schema & knowledgebase'
            data={['foo', 'bar', 'baz']}
          />
          <AreaChart />
          <LogTable
            data={[
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce71',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce72',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc13',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8277e0910d750195b448797616e091ad4',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce75',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc16',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8277e0910d750195b448797616e091ad7',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce78',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc19',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8277e0910d750195b448797616e091ad11',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce712',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc113',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8277e0910d750195b448797616e091ad14',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce715',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc116',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8277e0910d750195b448797616e091ad17',
                user: 'tealc@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>kms</InlineTag>&nbsp;
                    <InlineTag color='red'>cadcad</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: '8fa14cdd754f91cc6554c9e71929cce718',
                user: 'daniel@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>fluff</InlineTag>&nbsp;
                    <InlineTag color='green'>rock</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
              {
                event: 'Tags Changed',
                objectID: 'd86ec7ac67cf45f6205a8ed9080e6fc119',
                user: 'steve@sgc.com',
                data: (
                  <div>
                    <InlineTag color='green'>tree</InlineTag>&nbsp;
                    <InlineTag color='red'>stick</InlineTag>
                  </div>
                ),
                time: 'yesterday',
              },
            ]}
          />
          <Button
            onClick={() =>
              fetch('/api')
                .then((resp) => resp.json())
                .then((data) => {
                  console.log(data.message);
                })
            }
          >
            Summon some data!
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
