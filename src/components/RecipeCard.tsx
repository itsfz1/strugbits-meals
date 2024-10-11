import React from 'react';
import { Star, Trash2 } from "lucide-react"

interface RecipeCardProps {
  title: string;
  description: string;
  cuisine: string;
  rating: number;
  category: string;
  mealType: string;
  onDelete: () => void;
}

export default function RecipeCard({
  title,
  description,
  cuisine,
  rating,
  category,
  mealType,
  onDelete
}: RecipeCardProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const fillPercentage = Math.min(Math.max((rating - index) * 100, 0), 100);
      return (
        <div key={index} className="relative inline-block">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="p-4">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/400/300"
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            {mealType}
          </div>
          <button
            onClick={onDelete}
            className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Delete recipe"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="pt-4">
          <h1 className="font-bold text-2xl mb-2">Recipe of the Day</h1>
          <h2 className="font-bold text-xl mb-2">{title}</h2>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          <p className="text-gray-600 text-sm mb-4">
            This delicious recipe is perfect for any occasion. Whether you're cooking for your family or hosting a dinner party, this dish is sure to impress. Follow the simple instructions and enjoy a restaurant-quality meal at home!
          </p>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">Cuisine: {cuisine}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-1">Rating:</span>
            {renderStars(rating)}
          </div>
        </div>
      </div>
    </div>
  );
}