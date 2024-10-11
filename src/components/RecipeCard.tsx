import { Star, Trash2 } from "lucide-react"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  cuisine: string
  rating: number
  mealType: string
  image: string
  isSelected: boolean
  isDelete?: boolean
  activeTab: string
  onSelect: () => void
  onDelete: (id: number) => void
}

export default function RecipeCard({
  id,
  image,
  title,
  description,
  cuisine,
  rating,
  mealType,
  isSelected,
  isDelete = false,
  activeTab,
  onSelect,
  onDelete,
}: RecipeCardProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100)
      return (
        <div key={index} className="relative inline-block">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      )
    })
  }

  return (
    <div
      className={`w-[450px] rounded-2xl overflow-hidden shadow-lg bg-white ${
        isSelected ? "border-2 border-[#0f3460]" : "border-transparent"
      } ${activeTab === "All Meals" ? "cursor-pointer" : "default"}`}
      onClick={activeTab === "All Meals" ? onSelect : undefined}
      aria-label={`Select ${title}`}
    >
      <div className="p-8">
        <div className="relative rounded-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            {mealType}
          </div>
          {isDelete ? (
            <button
              onClick={() => onDelete(id)}
              className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Delete recipe"
            >
              <Trash2 size={16} />
            </button>
          ) : null}
        </div>
        <div className="pt-4">
          <h1 className="font-bold text-2xl mb-2">{title}</h1>
          <p className="text-gray-700 text-base mb-4">{description}</p>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">Cuisine: {cuisine}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-1">Rating: {rating}</span>
            {renderStars(rating)}
          </div>
        </div>
      </div>
    </div>
  )
}
