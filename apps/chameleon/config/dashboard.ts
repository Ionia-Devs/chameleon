import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Chat',
      href: '/showcase/chat',
    },
    {
      title: 'Mail',
      href: '/showcase/mail',
    },
  ],
  sidebarNav: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
    {
      title: 'Todos',
      href: '/dashboard/todos',
      icon: 'CheckCircledIcon',
    },
    {
      title: 'Explore',
      href: '/dashboard/explore',
      icon: 'pizza',
    },
    {
      title: 'Cards',
      href: '/dashboard/cards',
      icon: 'CardStackPlusIcon',
    },
  ],
}
