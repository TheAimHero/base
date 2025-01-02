import { ListTodoIcon } from 'lucide-react';

import { type SidebarItems } from '@/types/sidebar';

export const todoSidebarItems: SidebarItems = {
  icon: <ListTodoIcon />,
  title: 'Todos',
  url: '/todos',
};
