import { FilesIcon } from 'lucide-react';

import { type SidebarItems } from '@/types/sidebar';

export const filesSidebarItems: SidebarItems = {
  icon: <FilesIcon />,
  title: 'Files',
  url: '/files',
};
