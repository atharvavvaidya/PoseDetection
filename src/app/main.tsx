import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './_assets/style.scss'
import { AppRotuer } from './app.router'

createRoot(document.getElementById('root')!).render(<RouterProvider router={AppRotuer} />)
