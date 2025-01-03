'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/Header'
import NewsGrid from '../components/NewsGrid'
import CategoryNav from '../components/CategoryNav'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header onSearch={setSearchQuery} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-100">Search Results for "{searchQuery}"</h1>
        <CategoryNav currentCategory={category} onCategoryChange={handleCategoryChange} />
        <NewsGrid key={`${category}-${searchQuery}`} category={category} searchQuery={searchQuery} />
      </main>
      <footer className="bg-gray-800 text-center py-4 text-gray-300">
        <p>&copy; 2023 News Aggregator. All rights reserved.</p>
      </footer>
    </div>
  )
}

