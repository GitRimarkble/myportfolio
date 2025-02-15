'use client'

import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const savedMode = localStorage.getItem('color-mode') || 'light'
    setMode(savedMode)
    // Don't set data-theme here as it's handled by DaisyThemeSwitcher
  }, [])

  const handleModeChange = (newMode: string) => {
    const savedDaisyTheme = localStorage.getItem('daisy-theme') || 'corporate'
    // Apply the daisy theme with the mode variant
    document.documentElement.setAttribute('data-theme', newMode === 'dark' ? 'dark' : savedDaisyTheme)
    localStorage.setItem('color-mode', newMode)
    setMode(newMode)
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        {mode === 'dark' ? '🌙' : '🌞'} Mode
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <button 
            onClick={() => handleModeChange('light')}
            className={`${mode === 'light' ? 'active' : ''}`}
          >
            🌞 Light
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleModeChange('dark')}
            className={`${mode === 'dark' ? 'active' : ''}`}
          >
            🌙 Dark
          </button>
        </li>
      </ul>
    </div>
  )
}
