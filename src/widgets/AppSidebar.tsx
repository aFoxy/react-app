import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@shared/ui/sidebar'
import { Separator } from '@shared/ui/separator'
import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@shared/ui/collapsible'
import { NavLink } from 'react-router'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Refs',
    url: '/refs',
    icon: Inbox,
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Calendar,
  },
  {
    title: 'Audit',
    url: '/audit',
    icon: Search,
  },
  {
    title: 'Users',
    url: '/users/33',
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <div className="px-4 py-3 font-bold">Logo</div>
          <Separator />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? 'font-bold text-blue-500' : 'text-gray-500'
                      }
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton isActive={isActive}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        Help
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem key="aa">
                          <SidebarMenuButton asChild>
                            <a href="">
                              <span>title</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-4 py-3 text-xs text-muted-foreground">React app © 2025</div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
