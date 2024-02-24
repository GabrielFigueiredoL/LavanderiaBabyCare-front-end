import './global.css'

import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/ThemeProvider'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="babycare-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
