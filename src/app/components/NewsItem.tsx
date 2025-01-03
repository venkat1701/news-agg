import Image from 'next/image'

interface NewsItemProps {
  title?: string
  description?: string
  category?: string
  imageUrl?: string
  sourceUrl?: string
  isLoading?: boolean
}

export default function NewsItem({ title, description, category, imageUrl, sourceUrl, isLoading = false }: NewsItemProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="w-full h-48 bg-gray-700"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <Image src={imageUrl || ''} alt={title || ''} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-2">{category}</span>
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{title}</h2>
        <p className="text-gray-400 mb-4">{description}</p>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
        >
          Read More
        </a>
      </div>
    </div>
  )
}

