import { useEffect, useState } from "react"
import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import RecipeCard from "./components/RecipeCard"
import Modal from "./components/Modal"
import { Recipe } from "./types/common"
import { getMapFromLocalStorage, removeRecipeByIdLocalStorage, saveMapToLocalStorage } from "./helpers"

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedRecipes, setSelectedRecipes] = useState<Map<number, Recipe>>(new Map())
  const [error, setError] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("All Meals")

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setRecipes(data.recipes)
      } catch (error) {
        setError("Something went wrong with the request!")
      }
    }
    if (activeTab !== "All Meals") {
      const data = getMapFromLocalStorage(activeTab)
      setSelectedRecipes(new Map())
      setRecipes(Array.from(data.values()))
    } else {
      fetchRecipes()
    }
  }, [activeTab])

  const handleSelect = (recipe: Recipe) => {
    setSelectedRecipes((prevSelected) => {
      const newSelected = new Map(prevSelected)
      if (newSelected.has(recipe.id)) {
        newSelected.delete(recipe.id)
      } else {
        newSelected.set(recipe.id, recipe)
      }

      return newSelected
    })
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSave = (selectedWeek: string) => {
    saveMapToLocalStorage(selectedWeek, selectedRecipes)
    setSelectedRecipes(new Map())
  }
  const handleDelete = (id: number) => {
    removeRecipeByIdLocalStorage(activeTab, id)
    const data = getMapFromLocalStorage(activeTab)
    setRecipes(Array.from(data.values()))
  }
  if (error) {
    return <div className="flex items-center justify-center font-bold text-red-700 ">Error: {error}</div>
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
      <Banner
        title="Optimized Your Meal"
        subtitle="Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks."
        backgroundImage="https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Navbar onAddToWeek={handleOpenModal} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex items-center justify-center flex-wrap -mt-16 pb-14">
        <div className="max-w-[1600px] grid grid-cols-1 gap-14 lg:grid-cols-3">
          {recipes.length ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                activeTab={activeTab}
                id={recipe.id}
                image={recipe.image}
                title={recipe.name}
                description={recipe.instructions.join(", ")}
                rating={recipe.rating}
                cuisine={recipe.cuisine}
                mealType={recipe.mealType.join(", ")}
                isSelected={selectedRecipes.has(recipe.id)}
                onSelect={() => handleSelect(recipe)}
                isDelete={activeTab !== "All Meals"}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-black text-5xl font-bold mb-2">Opps! No meals in this week!</h1>
              <p className="text-black text-sm font-semibold mt-3">Add some yummy meals to it!</p>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />
    </main>
  )
}

export default App
