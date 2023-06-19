import {
  IconFileText,
  IconBrandSlack,
  IconBrandGithub,
} from '@tabler/icons-react';

import NavLink from '@/components/navbar/NavLink';

const data = [
  {
    icon: <IconBrandSlack size='1rem' />,
    color: 'gray',
    label: 'Slack',
    href: 'https://blockscienceteam.slack.com/archives/C029RATAVTJ',
  },
  {
    icon: <IconBrandGithub size='1rem' />,
    color: 'gray',
    label: 'Github',
    href: 'https://github.com/blockScience/kms',
  },
  {
    icon: <IconFileText size='1rem' />,
    color: 'gray',
    label: 'Documentation',
    href: 'https://blockscience.github.io/kms/',
  },
];

export function LinksLower() {
  const links = data.map((link) => <NavLink {...link} key={link.label} />);
  return <div id='tour-navExternal'>{links}</div>;
}
