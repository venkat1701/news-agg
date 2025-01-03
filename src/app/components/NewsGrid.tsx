'use client'

import { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import { Button } from './Button'

async function getNews(category?: string, searchQuery?: string, page: number = 1) {
  try {
    const url = new URL('/api/news', window.location.origin)
    if (category && category !== 'All') {
      url.searchParams.append('category', category)
    }
    if (searchQuery) {
      url.searchParams.append('q', searchQuery)
    }
    url.searchParams.append('page', page.toString())
    const res = await fetch(url.toString())
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || 'Failed to fetch news')
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export default function NewsGrid({ category = 'All', searchQuery = '' }) {
  const [news, setNews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedNews = await getNews(category, searchQuery, currentPage);
        console.log('Fetched news articles:', fetchedNews.articles); // Debug
        setNews(fetchedNews.articles || []);
        setTotalPages(fetchedNews.totalPages || 1);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, [category, searchQuery, currentPage]);
  
  

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-xl">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {isLoading
          ? Array(9).fill(null).map((_, index) => (
              <NewsItem key={index} isLoading={true} />
            ))
          : news.map((item: any) => (
              <NewsItem
                key={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                imageUrl={item.imageUrl}
                sourceUrl={item.sourceUrl}
              />
            ))}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

