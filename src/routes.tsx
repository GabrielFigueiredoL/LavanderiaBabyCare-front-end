import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Configs } from './pages/app/Configs/Configs'
import { Deliveries } from './pages/app/Deliveries/Deliveries'
import { Finances } from './pages/app/Finances/Finances'
import { Home } from './pages/app/Home/Home'
import { NewDelivery } from './pages/app/NewDelivery/NewDelivery'
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
        path: '/Deliveries',
        element: <Deliveries />,
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
        element: <NewDelivery />,
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
