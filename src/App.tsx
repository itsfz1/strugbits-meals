import Banner from "./components/Banner"
import Navbar from "./components/Navbar"

const App = () => {
  const handleAddToWeek = () => {
    // Implement the logic for adding to week
    console.log("Add to Week clicked")
  }
  return (
    <main className="w-full h-dvh bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
      <Banner
        title="Optimized Your Meal"
        subtitle="Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks."
        backgroundImage="https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Navbar onAddToWeek={handleAddToWeek} />
    </main>
  )
}

export default App
