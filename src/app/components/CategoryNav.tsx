const categories = ['All', 'Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']

interface CategoryNavProps {
  currentCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryNav({ currentCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="mb-8">
      <ul className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

