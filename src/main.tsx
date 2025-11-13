import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { Toaster } from '@shared/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App></App>
    <Toaster richColors />
  </StrictMode>
)
