'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <ul className="menu menu-horizontal px-1">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/projects">Projects</Link></li>
      <li><Link href="/blog">Blog</Link></li>
      <li><Link href="/contact">Contact</Link></li>
    </ul>
  );
}
