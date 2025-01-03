import { NextResponse } from 'next/server'

const API_KEY = "818e3af0681c4b8cb4a018ad6f622d58"
const BASE_URL = 'https://newsapi.org/v2/top-headlines'
const PAGE_SIZE = 9 // Number of articles per page

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const query = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '1', 10)

  let url = `${BASE_URL}?country=us&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}&page=${page}`
  if (category && category !== 'All') {
    url += `&category=${category.toLowerCase()}`
  }
  if (query) {
    url += `&q=${query}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error('NewsAPI Error:', data)
      throw new Error(data.message || 'Failed to fetch news')
    }

    const articles = data.articles.map((article: any, index: number) => ({
      id: `${page}-${index}`,
      title: article.title,
      description: article.description,
      category: category || 'General',
      imageUrl: article.urlToImage || '/placeholder.svg?height=200&width=300',
      sourceUrl: article.url,
    }))

    return NextResponse.json({
      articles,
      totalResults: data.totalResults,
      currentPage: page,
      totalPages: Math.ceil(data.totalResults / PAGE_SIZE)
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

