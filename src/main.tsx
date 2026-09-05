import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { listenForFirstGesture } from './sound'

/* Opens the audio context on the first gesture, so the dock's ticks are not
   swallowed by the browser's autoplay rule. It makes no sound of its own. */
listenForFirstGesture()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
