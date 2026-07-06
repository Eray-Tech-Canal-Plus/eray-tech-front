import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ErayTechBlog from './blog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErayTechBlog />
  </StrictMode>,
)
