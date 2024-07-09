'use client'

import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useDebounceValue } from '@/hooks/useDebounceValue'

const SearchInput = () => {
  const searchParams = useSearchParams()

  const title = searchParams.get('title')

  const [value, setValue] = useState(title || '')

  const pathname = usePathname()
  const router = useRouter()

  const debounceValue = useDebounceValue<string>(value)

  useEffect(() => {
    const query = {
      title: debounceValue,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }, [debounceValue, router])

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  if (pathname !== '/') return null

  return (
    <div className="relative sm:block hidden">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleChangeInput}
        placeholder="Search"
        className="pl-10 bg-primary/10"
      />
    </div>
  )
}

export default SearchInput
