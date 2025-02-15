'use client'

import { useState, useEffect } from 'react'

const daisyThemes = [
	"cupcake", "corporate", "synthwave", 
	"retro", "cyberpunk", "valentine", "halloween", "garden", 
	"forest", "aqua", "lofi", "pastel", "fantasy", 
	"wireframe", "black", "luxury", "dracula"
]

export default function DaisyThemeSwitcher() {
	const [daisyTheme, setDaisyTheme] = useState('corporate')

	useEffect(() => {
		const savedDaisyTheme = localStorage.getItem('daisy-theme') || 'corporate'
		document.documentElement.setAttribute('data-theme', savedDaisyTheme)
		setDaisyTheme(savedDaisyTheme)
	}, [])

	const handleDaisyThemeChange = (newTheme: string) => {
		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('daisy-theme', newTheme)
		setDaisyTheme(newTheme)
	}

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost m-1">
				🎨 Style
			</div>
			<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto">
				{daisyThemes.map((themeName) => (
					<li key={themeName}>
						<button 
							onClick={() => handleDaisyThemeChange(themeName)}
							className={`capitalize ${daisyTheme === themeName ? 'active' : ''}`}
						>
							{themeName}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}