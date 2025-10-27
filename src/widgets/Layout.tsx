import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { AppSidebar } from '@/widgets/AppSidebar'
import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/widgets/AppHeader'

export function Layout({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar open={open} setOpen={setOpen}></AppSidebar>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <AppHeader></AppHeader>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4">
            <Card className="h-full p-6">{children ?? 'Контентная область'}</Card>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
