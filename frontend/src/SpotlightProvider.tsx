import { SpotlightProvider as Spotlight, SpotlightAction } from '@mantine/spotlight';
import { Search, Home, Dashboard, FileText } from 'tabler-icons-react';

interface SpotlightProps {
  children: React.ReactNode;
}

const actions: SpotlightAction[] = [
  {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
    icon: <Home size="1.2rem" />,
  },
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
    icon: <Dashboard size="1.2rem" />,
  },
  {
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
    icon: <FileText size="1.2rem" />,
  },
];

export function SpotlightProvider({ children }: SpotlightProps) {
  return (
    <Spotlight
      shortcut={['mod + P', 'mod + K', '/']}
      // actions={[]}
      actions={actions}
      searchIcon={<Search size="1.2rem" />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
    >
      {children}
    </Spotlight>
  );
}