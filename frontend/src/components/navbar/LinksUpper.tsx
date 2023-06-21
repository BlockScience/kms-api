import {
  IconLayoutDashboard,
  IconAlertCircle,
  IconMessages,
  IconBinaryTree2,
  IconTimeline,
} from '@tabler/icons-react'
import { mapNavLinks } from '@/components/navbar/NavLink'

const data = [
  {
    icon: <IconLayoutDashboard size='1rem' />,
    color: 'blue',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IconAlertCircle size='1rem' />,
    color: 'teal',
    label: 'Proposals',
    path: '/proposals',
  },
  {
    icon: <IconBinaryTree2 size='1rem' />,
    color: 'violet',
    label: 'Schema',
    path: '/schema',
  },
  {
    icon: <IconTimeline size='1rem' />,
    color: 'grape',
    label: 'Activity',
    path: '/activity',
  },
  {
    icon: <IconMessages size='1rem' />,
    color: 'pink',
    label: 'Chat',
    path: '/chat',
  },
]

export function LinksUpper() {
  return <div id='tour-navInternal'>{mapNavLinks(data)}</div>
}
