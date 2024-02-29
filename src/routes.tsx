import { createBrowserRouter } from 'react-router-dom'

import { Configs } from './pages/app/Configs'
import { Delivery } from './pages/app/Delivery'
import { Finances } from './pages/app/Finances'
import { Home } from './pages/app/Home/Home'
import { Withdraw } from './pages/app/Withdraw'
import { SignIn } from './pages/auth/SignIn'
import { AppLayout } from './pages/layouts/app'

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
        path: '/delivery',
        element: <Delivery />,
      },
      {
        path: '/withdraw',
        element: <Withdraw />,
      },
      {
        path: '/finances',
        element: <Finances />,
      },
      {
        path: '/configs',
        element: <Configs />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])
