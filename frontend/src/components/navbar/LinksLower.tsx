import { IconFileText, IconBrandSlack, IconBrandGithub } from '@tabler/icons-react'

import { mapNavLinks, NavLinkProps } from '@/components/navbar/NavLink'

const data: NavLinkProps[] = [
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
    path: '/docs',
  },
]

export function LinksLower() {
  return <div id='tour-navExternal'>{mapNavLinks(data)}</div>
}
