'use client';

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import DaisyThemeSwitcher from './DaisyThemeSwitcher';

export default function MobileNavigation() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 min-h-full bg-base-200">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <div className="flex gap-2 mt-4 px-4">
          <ThemeSwitcher />
          <DaisyThemeSwitcher />
        </div>
      </ul>
    </div>
  );
}
