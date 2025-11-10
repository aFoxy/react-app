import { Spinner } from '@shared/ui/spinner'

export default function HydrationSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8 text-blue-500" />
    </div>
  )
}
