export default function NewsError() {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-400 mb-4">We're having trouble loading the latest news. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }
  
  