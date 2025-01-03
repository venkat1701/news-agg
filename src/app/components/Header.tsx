'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onSearch: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white mb-4 md:mb-0">
          News Aggregator
        </Link>
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

