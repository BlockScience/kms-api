import {
  SpotlightProvider as Spotlight,
  SpotlightAction,
} from '@mantine/spotlight';
import { Group, rem, Text, Anchor } from '@mantine/core';
import {
  IconSearch,
  IconHome,
  IconDashboard,
  IconFileText,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SpotlightProps {
  children: React.ReactNode;
}

function ActionsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Group
        position='apart'
        px={15}
        py='xs'
        sx={(theme) => ({
          borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Text size='xs' color='dimmed'>
          Search can do more than just plain text
        </Text>
        <Anchor
          size='xs'
          href='https://blockscience.github.io/kms/start/advanced-search/'
          target='_blank'
        >
          Learn more
        </Anchor>
      </Group>
    </div>
  );
}

export function SpotlightProvider({ children }: SpotlightProps) {
  const [query, setQuery] = useState('');

  const commandPrefix = query.startsWith('/');
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  function handleSearch(query: string) {
    navigate('/search', { state: { q: query } });
  }
  const actions: SpotlightAction[] = commandPrefix
    ? [
        {
          title: '/command 1',
          onTrigger: () => {},
          icon: <IconHome size='1.2rem' />,
        },
        {
          title: '/command 2',
          onTrigger: () => {},
          icon: <IconDashboard size='1.2rem' />,
        },
        {
          title: '/command 3',
          onTrigger: () => {},
          icon: <IconFileText size='1.2rem' />,
        },
      ]
    : query !== ''
    ? [
        {
          title: `Search for "${query}"`,
          onTrigger: () => {
            handleSearch(query);
          },
        },
      ]
    : [];

  return (
    <Spotlight
      shortcut={['mod + P', 'mod + K', '/']}
      actions={actions}
      searchIcon={<IconSearch size='1.2rem' />}
      searchPlaceholder='Search...'
      nothingFoundMessage="Hit 'Enter' to search..."
      query={query}
      onQueryChange={setQuery}
      limit={7}
      // actionsWrapperComponent={ActionsWrapper}
    >
      {children}
    </Spotlight>
  );
}
