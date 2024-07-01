'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import SearchInput from '../SearchInput'
import { ModeToggle } from '../theme-toggle'
import { NavMenu } from './NavMenu'

const Navbar = () => {
  const router = useRouter()
  const { userId } = useAuth()

  return (
    <div className="sticky top-0 border border-b-primary/10 bg-secondary z-10">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image src="/logo.png" alt="logo" width={70} height={50} />
            <div className="font-bold text-xl">Kidooo Travel</div>
          </div>

          <SearchInput />

          <div className="flex gap-4 items-center">
            <div className="flex gap-4">
              <NavMenu />
            </div>

            {!userId ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/sign-in')}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => router.push('/sign-up')}>
                  Sign Up
                </Button>
              </>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
