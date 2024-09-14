import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Configs } from './pages/app/Configs/Configs'
import { Finances } from './pages/app/Finances/Finances'
import { Home } from './pages/app/Home/Home'
import { NewOrder } from './pages/app/NewOrder/NewOrder'
import { Orders } from './pages/app/Orders/Orders'
import { PDFTemplate } from './pages/app/toPrint'
import { SignIn } from './pages/auth/SignIn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/finances',
        element: <Finances />,
      },
      {
        path: '/configs',
        element: <Configs />,
      },
      {
        path: '/new',
        element: <NewOrder />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/toPrint',
    element: <PDFTemplate />,
  },
])
