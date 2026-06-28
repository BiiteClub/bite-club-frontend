'use client';

import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, usePathname } from '@/i18n/navigation';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}

      <SidebarMenu>
        {projects.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.name}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

