import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cart from './Cart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cart />
  </StrictMode>,
)
