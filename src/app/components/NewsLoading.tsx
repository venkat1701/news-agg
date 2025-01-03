export default function NewsLoading() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="w-full h-48 bg-gray-700"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  