import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../../../index.css"
import UserProfile from "./UserProfile"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfile />
  </StrictMode>,
)
