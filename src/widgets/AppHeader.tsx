import { SidebarTrigger } from '@shared/ui/sidebar'
import { Button } from '@shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar'
import { useAuth } from '@features/auth/auth-context'

export function AppHeader() {
  const { logout, user } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <SidebarTrigger></SidebarTrigger>
      <div className="font-semibold">Page title</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Action
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/user.png" alt="User" />
              <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
