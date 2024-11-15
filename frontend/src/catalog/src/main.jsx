import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Catalog from './Catalog'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Catalog />
  </StrictMode>,
)
