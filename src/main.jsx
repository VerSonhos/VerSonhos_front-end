import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
