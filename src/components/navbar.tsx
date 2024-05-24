'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const links: {
  name: string
  href: string
}[] = [
  { name: 'home', href: '/' },
  { name: 'posts', href: '/posts' },
  { name: 'projects', href: '/projects' },
  { name: 'adventures', href: '/adventures' },
]

const navbarVariants: Variants = {
  open: {
    visibility: 'visible',
    display: 'flex',
    opacity: 1,
    translateY: '0%',
  },
  closed: {
    visibility: 'hidden',
    opacity: 0,
    translateY: '-100%',
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const path = usePathname()

  return (
    <motion.div className='flex items-center justify-center'>
      <motion.div
        onMouseDown={() => {
          setIsOpen(!isOpen)
        }}
        className='hamburger cursor-pointer absolute right-6 top-6 z-50'
      >
        {isOpen ? 'close' : 'open'}
      </motion.div>
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={navbarVariants}
        initial={false}
        transition={{
          type: 'spring',
          damping: 20,
          mass: 0.75,
          stiffness: 50,
          velocity: 3,
          restSpeed: 0.01,
          restDelta: 0.01,
          staggerChildren: 2,
        }}
        className='navbar fixed top-0 left-0 flex flex-col gap-2 w-screen h-screen bg-black/30 -translate-y-full backdrop-blur-md justify-center px-20'
      >
        {links.map((link) => {
          return (
            <motion.div
              whileHover={{
                translateX: '20px',
              }}
              onClick={() => setIsOpen(!isOpen)}
              className={`text-9xl ${path === link.href ? 'font-bold' : ''}`}
              key={link.href}
            >
              <Link href={link.href} className='nav-link'>
                {link.name}
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
