'use client';

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import DaisyThemeSwitcher from './DaisyThemeSwitcher';

export default function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">My Portfolio</Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/lab">Lab</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <ThemeSwitcher />
        <DaisyThemeSwitcher />
      </div>
    </header>
  );
}

