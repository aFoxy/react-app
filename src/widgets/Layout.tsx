import type { ReactNode } from 'react'

import { Card } from '@shared/ui/card'
import { AppSidebar } from '@widgets/AppSidebar'
import { useState } from 'react'
import { SidebarProvider } from '@shared/ui/sidebar'
import { AppHeader } from '@widgets/AppHeader'
import { Spinner } from '@shared/ui/spinner'
import { useNavigation } from 'react-router'

export function Layout({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)

  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar></AppSidebar>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <AppHeader></AppHeader>

          {/* Content */}
          <main className="relative flex-1 overflow-y-auto p-4">
            {isNavigating && (
              <div
                id="backdrop"
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"
              >
                <Spinner className="size-6" />
              </div>
            )}
            <Card className="h-full p-6">{children ?? 'Контентная область'}</Card>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
