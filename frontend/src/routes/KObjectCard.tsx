import parseHtml from '@/utils/htmlParser'
import ObjectRID from '@/components/ObjectRID'
import { Anchor, Group, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { KObjectProps, SearchHit } from './Search'

// -------- SUBCOMPONENTS -------- //
function KObjectCard({ title, text, url, type, platform, tags, id }: KObjectProps) {
  const theme = useMantineTheme()
  const bg = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
  return (
    <Paper bg={bg} p='sm' radius='md' withBorder>
      <Group position='apart' noWrap align='start'>
        <Title order={5}>
          <Anchor color='inherit' target='_blank' href={url}>
            {title}
          </Anchor>
        </Title>
        <ObjectRID id={id} />
      </Group>
      <Text c='dimmed' fz='sm'>
        {type} from {platform}
      </Text>
      <Text>{text}</Text>
    </Paper>
  )
}
export const KObjectCards = ({ hits }: { hits: SearchHit[] }): JSX.Element => {
  const cards = hits.map((hit) => (
    <KObjectCard
      key={hit.document.id}
      id={hit.document.id}
      title={hit.document.title}
      url={hit.document.url}
      type={hit.document.type}
      platform={hit.document.platform}
      tags={hit.document.tags}
      text={parseHtml(hit.highlight.text?.snippet)}
    />
  ))
  return <>{cards}</>
}
